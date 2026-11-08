/**
 * Hebrew edition, phase 1: the `appearance.locale` setting, the Hebrew tutor
 * rule appended to every tutor agent, the worker rules, dictation defaulting,
 * and the math-aware block direction.
 */
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as os from "node:os";
import * as path from "node:path";
import { after, describe, it } from "node:test";
import { createFauxCore } from "@earendil-works/pi-ai";
import type { PiEngine } from "../src/agent/models.ts";

// Isolate data/auth BEFORE importing app modules (stores bind at import).
const scratch = fs.mkdtempSync(path.join(os.tmpdir(), "lh-hebrew-locale-"));
const originalEnv = { ...process.env };
process.env.LH_DATA_DIR = path.join(scratch, "data");
process.env.LH_AUTH_FILE = path.join(scratch, "auth.json");
after(() => {
	process.env = originalEnv;
	fs.rmSync(scratch, { recursive: true, force: true });
});

const { FACTORY_SETTINGS, sanitizeUserSettings } = await import("../src/core/settings.ts");
const { resolveSettings } = await import("../src/core/settings-resolution.ts");
const { parseAppearanceSettingsBody } = await import("../src/server/settings-body.ts");
const { defaultDictationLanguage, isLocale, localeDir } = await import("../src/core/locale.ts");
const { HEBREW_TUTOR_RULE, tutorLocaleRule, workerLocaleRule, withLocale } = await import("../src/agent/locale/he.ts");
const { composeInstructions, createPracticeAgent, createProberAgent, createTeacherAgent } = await import("../src/agent/teacher-agent.ts");

function fauxEngine(): PiEngine {
	const faux = createFauxCore({});
	return { model: faux.getModel(), streamFn: faux.streamSimple };
}

describe("locale setting", () => {
	it("defaults to Hebrew", () => {
		assert.equal(FACTORY_SETTINGS.appearance.locale, "he");
		assert.equal(resolveSettings(null).appearance.locale, "he");
	});
	it("sanitizes: valid values kept, junk dropped", () => {
		assert.equal(sanitizeUserSettings({ appearance: { locale: "en" } })?.appearance?.locale, "en");
		assert.equal(sanitizeUserSettings({ appearance: { locale: "fr" } })?.appearance?.locale, undefined);
		assert.equal(resolveSettings({ version: 1, appearance: { locale: "en" } }).appearance.locale, "en");
	});
	it("the PUT parser accepts he/en and rejects anything else", () => {
		assert.deepEqual(parseAppearanceSettingsBody({ locale: "he" }), { ok: true, settings: { locale: "he" } });
		const bad = parseAppearanceSettingsBody({ locale: "iw" });
		assert.equal(bad.ok, false);
	});
	it("helpers", () => {
		assert.ok(isLocale("he") && isLocale("en") && !isLocale("de"));
		assert.equal(localeDir("he"), "rtl");
		assert.equal(localeDir("en"), "ltr");
	});
});

describe("dictation follows the locale unless picked", () => {
	it("absent pick → locale's language", () => {
		assert.equal(defaultDictationLanguage(undefined), "he");
		assert.equal(resolveSettings(null).dictation.language, "he");
		assert.equal(resolveSettings({ version: 1, appearance: { locale: "en" } }).dictation.language, "en");
	});
	it("an explicit pick wins", () => {
		assert.equal(resolveSettings({ version: 1, dictation: { language: "en" } }).dictation.language, "en");
		assert.equal(resolveSettings({ version: 1, appearance: { locale: "en" }, dictation: { language: "he" } }).dictation.language, "he");
	});
});

describe("tutor prompt", () => {
	const ctx = {
		chatId: "chat_test",
		chatStore: { getChat: () => ({ messages: [] }) },
		deliver: () => {},
		jobStore: {},
		spawn: () => {},
	} as never;
	const builds = {
		prober: (locale?: "he" | "en") => createProberAgent(ctx, { engine: fauxEngine(), tools: {}, locale }),
		teacher: (locale?: "he" | "en") => createTeacherAgent(undefined, { engine: fauxEngine(), tools: {}, locale }),
		practice: (locale?: "he" | "en") => createPracticeAgent(ctx, { engine: fauxEngine(), tools: {}, locale }),
	};
	for (const [kind, build] of Object.entries(builds)) {
		it(`${kind}: "he" appends the Hebrew rule last; "en"/absent is byte-identical to the source`, () => {
			const composed = composeInstructions(kind as keyof typeof builds);
			assert.equal(build("he").state.systemPrompt, `${composed}\n\n---\n\n${HEBREW_TUTOR_RULE}`);
			assert.equal(build("en").state.systemPrompt, composed);
			assert.equal(build(undefined).state.systemPrompt, composed);
		});
	}
	it("the rule covers language, neutral address, and untranslatable values", () => {
		assert.match(HEBREW_TUTOR_RULE, /Hebrew/);
		assert.match(HEBREW_TUTOR_RULE, /אתם/);
		assert.match(HEBREW_TUTOR_RULE, /predict/);
		assert.match(HEBREW_TUTOR_RULE, /\\text/);
		assert.equal(tutorLocaleRule("en"), "");
	});
});

describe("worker rules", () => {
	it("Hebrew adds one rule; English adds nothing", () => {
		assert.equal(withLocale("BASE", workerLocaleRule("en", "x")), "BASE");
		const he = withLocale("BASE", workerLocaleRule("he", "labels"));
		assert.ok(he.startsWith("BASE\n\nLanguage: write labels in Hebrew"));
	});
});

describe("lesson text direction is CSS-only (no DOM wrappers)", () => {
	const css = fs.readFileSync(path.join(import.meta.dirname, "..", "app", "globals.css"), "utf8");
	it("math is an LTR isolate; prose paragraphs take their own direction", () => {
		assert.match(css, /\.katex,\s*\.katex-display\s*\{\s*direction:\s*ltr;\s*unicode-bidi:\s*isolate;/);
		assert.match(css, /\.lh-prose :is\(p, li,[^)]*\)\s*\{\s*unicode-bidi:\s*plaintext;\s*text-align:\s*start;/);
	});
});

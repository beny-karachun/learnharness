/**
 * Hebrew edition — the translation core (no library, no React).
 *
 * Messages live in per-area modules under ./messages/, each entry holding
 * BOTH languages side by side, so a missing translation is a type error:
 *
 *   export default defineMessages({
 *     "sidebar.newSession": { en: "New session", he: "שיעור חדש" },
 *     "sidebar.count": {
 *       en: { one: "{count} session", other: "{count} sessions" },
 *       he: { one: "שיעור אחד", two: "שני שיעורים", other: "{count} שיעורים" },
 *     },
 *   });
 *
 * Placeholders are `{name}`. A plural entry picks its form with
 * Intl.PluralRules for `vars.count` (Hebrew has one/two/other), falling
 * back to `other`.
 */
import type { ReactNode } from "react";
import type { Locale } from "@/src/core";

export type PluralText = { other: string } & Partial<Record<Intl.LDMLPluralRule, string>>;
export type Text = string | PluralText;
export type Entry = { en: Text; he: Text };
export type Messages = Record<string, Entry>;
export type Vars = Record<string, string | number>;

/** Identity helper that keeps the literal keys (for MessageKey). */
export function defineMessages<const M extends Messages>(messages: M): M {
	return messages;
}

const pluralRules = new Map<Locale, Intl.PluralRules>();
function pluralRule(locale: Locale, count: number): Intl.LDMLPluralRule {
	let rules = pluralRules.get(locale);
	if (!rules) {
		rules = new Intl.PluralRules(locale);
		pluralRules.set(locale, rules);
	}
	return rules.select(count);
}

function pick(text: Text, locale: Locale, vars: Vars | undefined): string {
	if (typeof text === "string") return text;
	const count = typeof vars?.count === "number" ? vars.count : Number(vars?.count ?? Number.NaN);
	if (!Number.isFinite(count)) return text.other;
	// Exact 1 / 2 always prefer their dedicated form when present.
	if (count === 1 && text.one !== undefined) return text.one;
	if (count === 2 && text.two !== undefined) return text.two;
	return text[pluralRule(locale, count)] ?? text.other;
}

function fill(template: string, vars: Vars | undefined, locale: Locale): string {
	if (!vars) return template;
	return template.replace(/\{(\w+)\}/g, (whole, name: string) => {
		const value = vars[name];
		if (value === undefined) return whole;
		return typeof value === "number" ? value.toLocaleString(locale === "he" ? "he-IL" : "en-US") : value;
	});
}

export function translateEntry(entry: Entry | undefined, locale: Locale, vars?: Vars): string {
	if (!entry) return "";
	return fill(pick(entry[locale], locale, vars), vars, locale);
}

/** Split a template around `{name}` placeholders whose values are React
 *  nodes (links, <code>, icons) — the rich-text form of translate. */
export function fillNodes(template: string, nodes: Record<string, ReactNode>): ReactNode[] {
	const out: ReactNode[] = [];
	let last = 0;
	for (const match of template.matchAll(/\{(\w+)\}/g)) {
		const name = match[1]!;
		if (!(name in nodes)) continue;
		if (match.index! > last) out.push(template.slice(last, match.index));
		out.push(nodes[name]);
		last = match.index! + match[0].length;
	}
	if (last < template.length) out.push(template.slice(last));
	return out;
}

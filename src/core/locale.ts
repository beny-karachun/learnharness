/** App language (Hebrew edition). One app-wide choice: the UI language and
 *  direction, and the language the tutor and the learner-visible background
 *  workers write in. Pure and browser-safe. */

export const LOCALES = ["he", "en"] as const;
export type Locale = (typeof LOCALES)[number];

/** The Hebrew edition's default. */
export const DEFAULT_LOCALE: Locale = "he";

export function isLocale(value: unknown): value is Locale {
	return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function localeDir(locale: Locale): "rtl" | "ltr" {
	return locale === "he" ? "rtl" : "ltr";
}

/** Dictation language when the learner hasn't picked one: follows the app
 *  language (absent locale = the edition default). */
export function defaultDictationLanguage(locale: Locale | undefined): "he" | "en" {
	return (locale ?? DEFAULT_LOCALE) === "he" ? "he" : "en";
}

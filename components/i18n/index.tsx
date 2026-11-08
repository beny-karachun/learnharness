"use client";
/**
 * Hebrew edition — the React side of translation.
 *
 *   const t = useT();
 *   t("sidebar.newSession")
 *   t("sidebar.count", { count: n })
 *   t.rich("settings.keysHint", { link: <a …>…</a> })   // ReactNode[]
 *
 * The context DEFAULT is English: a component rendered without the
 * provider (most tests) behaves exactly as before. The root layout mounts
 * the provider with the locale it read from settings on the server, so the
 * first paint is already in the right language and direction.
 */
import { Direction } from "radix-ui";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import type { Locale } from "@/src/core";
import { makeT, type Translate } from "./translate";

export type { MessageKey, Translate } from "./translate";
export { makeT } from "./translate";

const englishT = makeT("en");
const I18nContext = createContext<Translate>(englishT);

export function I18nProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
	const t = useMemo(() => makeT(locale), [locale]);
	return (
		<I18nContext value={t}>
			<Direction.DirectionProvider dir={t.dir}>{children}</Direction.DirectionProvider>
		</I18nContext>
	);
}

export function useT(): Translate {
	return useContext(I18nContext);
}

export function useLocale(): Locale {
	return useContext(I18nContext).locale;
}

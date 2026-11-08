/** Hebrew edition — plain translation (no React, no "use client"): safe for
 *  server components (app/**), route handlers, and .ts helpers.
 *  Client components use `useT()` from "@/components/i18n" instead. */
import type { ReactNode } from "react";
import { localeDir, type Locale } from "@/src/core";
import { catalog, type MessageKey } from "./catalog";
import { fillNodes, translateEntry, type Vars } from "./core";

export type { MessageKey } from "./catalog";

export interface Translate {
	(key: MessageKey, vars?: Vars): string;
	/** Placeholders replaced by React nodes (links, code, icons). */
	rich(key: MessageKey, nodes: Record<string, ReactNode>, vars?: Vars): ReactNode[];
	locale: Locale;
	dir: "rtl" | "ltr";
}

export function makeT(locale: Locale): Translate {
	const t = ((key: MessageKey, vars?: Vars) => translateEntry(catalog[key], locale, vars)) as Translate;
	t.rich = (key, nodes, vars) => fillNodes(translateEntry(catalog[key], locale, vars), nodes);
	t.locale = locale;
	t.dir = localeDir(locale);
	return t;
}

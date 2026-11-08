import type { Metadata } from "next";
import { Frank_Ruhl_Libre, IBM_Plex_Sans_Hebrew, JetBrains_Mono, Source_Sans_3 } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";
import { AppShell, SidebarProvider } from "@/components/sidebar";
import { ActivityProvider } from "@/components/activity-dock";
import { ServerEventsProvider } from "@/components/server-events";
import { AppearanceProvider } from "@/components/settings/appearance";
import UpdateBanner from "@/components/update-banner";
import { I18nProvider } from "@/components/i18n";
import { DEFAULT_LOCALE, localeDir, type Locale } from "@/src/core";
import { readSettingsRecord } from "@/src/server";

// Chrome = JetBrains Mono, teaching prose = Source Sans 3, titles = CMU
// Serif (the bundled lh-cmu @font-face in globals.css — no CDN).
const ui = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
const prose = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans3" });
// Hebrew edition: Hebrew glyphs for every face (CSS fallback order in
// globals.css) — Plex for UI/prose/mono, Frank Ruhl for serif titles.
const hebrew = IBM_Plex_Sans_Hebrew({ subsets: ["hebrew"], weight: ["300", "400", "500", "600", "700"], variable: "--font-hebrew" });
const hebrewSerif = Frank_Ruhl_Libre({ subsets: ["hebrew"], weight: ["700"], variable: "--font-hebrew-serif" });

// Hebrew edition: the layout reads the app language from settings on every
// request (never at build time — the build machine's settings must not be
// baked into prerendered pages), so <html lang dir> and the translation
// provider are right on the first paint.
export const dynamic = "force-dynamic";

function appLocale(): Locale {
	try {
		return readSettingsRecord()?.appearance?.locale ?? DEFAULT_LOCALE;
	} catch {
		return DEFAULT_LOCALE;
	}
}

export function generateMetadata(): Metadata {
	const he = appLocale() === "he";
	return {
		title: "Learning Harness",
		description: he
			? "מורה AI עם זיכרון — שיעורים, שאלות וגרף ידע של מה שאתם יודעים."
			: "A teacher agent with a memory — sessions, quizzes, and a knowledge graph of what you know.",
	};
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const locale = appLocale();
	return (
		<html lang={locale} dir={localeDir(locale)} className={`dark ${ui.variable} ${prose.variable} ${hebrew.variable} ${hebrewSerif.variable}`}>
			<body className="min-h-dvh antialiased">
			{/* The notification channel rides OUTSIDE everything: sidebar, dock,
				 and pages all subscribe as the polls retire (push S3, 2026-10-02). */}
			<I18nProvider locale={locale}>
			<ServerEventsProvider>
				<AppearanceProvider>
					<SidebarProvider>
						<ActivityProvider>
							<AppShell>{children}</AppShell>
						</ActivityProvider>
					</SidebarProvider>
				</AppearanceProvider>
			</ServerEventsProvider>
			{/* Auto-update banner (Wave C): fixed card, Electron-only pushes. */}
			<UpdateBanner />
			</I18nProvider>
		</body>
		</html>
	);
}

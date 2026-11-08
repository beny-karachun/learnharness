"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { DICTATION_LANGUAGES, type DictationLanguage } from "@/src/core";
import { useT, type Translate } from "@/components/i18n";
import { MenuShell } from "@/components/menu-shell";
import { Hint } from "@/components/ui/hint";
import { SettingsMenuTrigger, SettingsRow } from "@/components/settings/controls";
import { SearchMenuList } from "@/components/settings/search-menu-list";
import { useDictationActive } from "@/components/dictation-state";
import { dictationErrorText, useDictationLanguage } from "@/components/dictation-preference";

type LanguagePreference = ReturnType<typeof useDictationLanguage>;
type LanguageItem = { code: DictationLanguage; label: string; english: string };

/** Hebrew edition: the Deepgram roster's names are English in src/core;
 *  in Hebrew the picker shows the platform's own language names
 *  (Intl.DisplayNames), sorted in Hebrew order with Multilingual first.
 *  English keeps the core list exactly. The English name stays searchable. */
function languageItems(t: Translate): LanguageItem[] {
	if (t.locale === "en") return DICTATION_LANGUAGES.map((item) => ({ ...item, english: item.label }));
	let names: Intl.DisplayNames | null = null;
	try { names = new Intl.DisplayNames([t.locale], { type: "language" }); } catch { /* English fallback below */ }
	const items = DICTATION_LANGUAGES.map((item) => {
		let label = item.label;
		if (item.code === "multi") label = t("shell.dictation.multilingual");
		else {
			try { label = names?.of(item.code) ?? item.label; } catch { /* keep the English name */ }
		}
		return { code: item.code, label, english: item.label };
	});
	const [multi, rest] = [items.filter((i) => i.code === "multi"), items.filter((i) => i.code !== "multi")];
	return [...multi, ...rest.sort((a, b) => a.label.localeCompare(b.label, t.locale))];
}

export function DictationLanguageSetting() {
	const t = useT();
	const preference = useDictationLanguage();
	const active = useDictationActive();
	return <SettingsRow label={t("shell.dictation.language")} testid="row-dictation-language" dimmed={active}>
		<DictationLanguagePicker preference={preference} disabled={active} />
	</SettingsRow>;
}

function DictationLanguagePicker({ preference, disabled }: {
	preference: LanguagePreference;
	disabled: boolean;
}) {
	const t = useT();
	const { language, saving, error: rawError, load, save } = preference;
	const error = rawError === null ? null : dictationErrorText(rawError, t);
	const items = useMemo(() => languageItems(t), [t]);
	const [open, setOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const label = items.find((item) => item.code === language)?.label ?? "—";

	useEffect(() => { if (disabled) setOpen(false); }, [disabled]);
	useEffect(() => {
		if (!open) return;
		const onPointerDown = (event: PointerEvent) => {
			const target = event.target as Element;
			if (target instanceof Element && target.closest('[data-testid="dictation-language-menu"]')) return;
			if (!triggerRef.current?.contains(target)) setOpen(false);
		};
		document.addEventListener("pointerdown", onPointerDown);
		return () => document.removeEventListener("pointerdown", onPointerDown);
	}, [open]);
	const closeOnEscape = (event: ReactKeyboardEvent) => {
		if (event.key !== "Escape") return;
		event.preventDefault();
		event.stopPropagation();
		setOpen(false);
		triggerRef.current?.focus();
	};
	const pick = async (code: DictationLanguage) => {
		if (disabled || saving || language === undefined) return;
		if (await save(code)) {
			setOpen(false);
			triggerRef.current?.focus();
		}
	};

	return <>
		<Hint label={error ?? t("shell.dictation.languageValue", { label })} side="top">
			<SettingsMenuTrigger
				ref={triggerRef}
				value={label}
				data-testid="dictation-language"
				aria-label={t("shell.dictation.languageValue", { label })}
				aria-expanded={open && !disabled}
				disabled={disabled || saving}
				onKeyDown={(event) => { if (open) closeOnEscape(event); }}
				onClick={() => {
					setOpen((value) => !value);
					if (language === undefined) void load().catch(() => {});
				}}
				className="min-w-20 max-w-[65%]"
			/>
		</Hint>
		{open && !disabled && <MenuShell
			anchorRef={triggerRef}
			testid="dictation-language-menu"
			preferredSide="down"
			menuClass="flex w-72 max-w-[calc(100vw-1rem)] flex-col rounded-xl border border-border bg-card p-2 text-xs shadow-xl"
		>
			<div onKeyDown={(event) => {
				closeOnEscape(event);
				if (event.key === "Enter") {
					// Empty search results must not submit the composer, but a
					// focused option button still needs Enter's native click.
					if (event.target instanceof HTMLInputElement) event.preventDefault();
					event.stopPropagation();
				}
			}}>
				{error && <div role="alert" className="mb-1.5 text-destructive">{error}</div>}
				<SearchMenuList
					items={items}
					itemKey={(item) => item.code}
					searchTerms={(item) => item.label === item.english ? [item.code, item.label] : [item.code, item.label, item.english]}
					isSelected={(item) => item.code === language}
					onPick={(item) => { void pick(item.code); }}
					disabled={saving || language === undefined}
					searchTestid="dictation-language-search"
					listTestid="dictation-language-list"
					optionTestid={(item) => `dictation-language-${item.code}`}
					ariaLabel={t("shell.dictation.searchLanguages")}
					placeholder={t("shell.dictation.searchPlaceholder")}
					empty={t("shell.dictation.noLanguages")}
					renderItem={(item) => <span className="text-card-foreground">{item.label}</span>}
				/>
			</div>
		</MenuShell>}
	</>;
}

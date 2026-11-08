"use client";

import type { CacheRetention } from "@earendil-works/pi-ai";
import { makeT, useT, type MessageKey, type Translate } from "@/components/i18n";

const EN = makeT("en");

const OPTIONS: readonly { value: CacheRetention | undefined; compact: MessageKey; label: MessageKey; description: MessageKey }[] = [
	{ value: undefined, compact: "settings.cache.compact.default", label: "settings.cache.option.default", description: "settings.cache.option.defaultHint" },
	{ value: "none", compact: "settings.cache.compact.none", label: "settings.cache.option.none", description: "settings.cache.option.noneHint" },
	{ value: "short", compact: "settings.cache.compact.short", label: "settings.cache.option.short", description: "settings.cache.option.shortHint" },
	{ value: "long", compact: "settings.cache.compact.long", label: "settings.cache.option.long", description: "settings.cache.option.longHint" },
];

export function cacheRetentionLabel(value: CacheRetention | undefined, t: Translate = EN): string {
	return t("settings.cache.label", { value: t(OPTIONS.find((option) => option.value === value)!.compact) });
}

export function CacheRetentionMenu({ value, onPick }: {
	value: CacheRetention | undefined;
	onPick: (value: CacheRetention | undefined) => void;
}) {
	const t = useT();
	return <>
		<div className="border-b border-border px-2 pb-2">
			<p className="text-card-foreground">{t("settings.cache.title")}</p>
			<p className="mt-1 text-muted-foreground">{t("settings.cache.description")}</p>
		</div>
		{OPTIONS.map((option) => <button
			key={option.value ?? "default"}
			type="button"
			data-testid={`cache-retention-option-${option.value ?? "default"}`}
			aria-pressed={value === option.value}
			onClick={() => onPick(option.value)}
			className={`rounded-lg px-2 py-2 text-start transition-colors hover:bg-muted ${value === option.value ? "bg-muted/60" : ""}`}
		>
			<span className="flex justify-between gap-2 text-card-foreground"><span>{t(option.label)}</span>{value === option.value && <span aria-hidden>✓</span>}</span>
			<span className="mt-1 block text-muted-foreground">{t(option.description)}</span>
		</button>)}
	</>;
}

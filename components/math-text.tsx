import katex from "katex";
import { Fragment } from "react";

/**
 * Hebrew edition — plain text with inline LaTeX rendered through KaTeX.
 *
 * Graph propositions (name, statement) are short plain strings that the
 * extractor writes with lesson-style math: `$Y_{X/O}$`, `$$…$$`, `\(…\)`,
 * `\[…\]`. Rendering them as text showed raw LaTeX in the node card; this
 * splits the string into text and math runs and renders only the math —
 * no markdown, no HTML from the input (katex output is the library's own).
 *
 * Inline `$…$` follows the usual markdown-math heuristic so prices stay
 * text: the opening `$` is not followed by whitespace, the closing `$` is
 * not preceded by whitespace and not followed by a digit; `\$` is a literal.
 */

export type MathRun = { kind: "text"; text: string } | { kind: "math"; tex: string; display: boolean };

const DELIMS: { open: string; close: string; display: boolean }[] = [
	{ open: "$$", close: "$$", display: true },
	{ open: "\\[", close: "\\]", display: true },
	{ open: "\\(", close: "\\)", display: false },
	{ open: "$", close: "$", display: false },
];

/** Split `src` into text and math runs (pure). */
export function splitMath(src: string): MathRun[] {
	const runs: MathRun[] = [];
	let text = "";
	let i = 0;
	const flush = () => {
		if (text) runs.push({ kind: "text", text });
		text = "";
	};
	outer: while (i < src.length) {
		if (src[i] === "\\" && src[i + 1] === "$") {
			text += "$";
			i += 2;
			continue;
		}
		for (const d of DELIMS) {
			if (!src.startsWith(d.open, i)) continue;
			const start = i + d.open.length;
			const end = findClose(src, start, d);
			if (end < 0) continue;
			const tex = src.slice(start, end);
			if (!tex.trim()) continue;
			flush();
			runs.push({ kind: "math", tex, display: d.display });
			i = end + d.close.length;
			continue outer;
		}
		text += src[i];
		i += 1;
	}
	flush();
	return runs;
}

function findClose(src: string, start: number, d: { open: string; close: string }): number {
	if (d.open === "$") {
		// Single-dollar: tight on both sides, never across a blank line.
		if (start >= src.length || /\s/.test(src[start]!)) return -1;
		for (let j = start; j < src.length; j++) {
			const c = src[j]!;
			if (c === "\\") {
				j += 1;
				continue;
			}
			if (c === "\n" && src[j + 1] === "\n") return -1;
			if (c === "$") {
				if (src[j + 1] === "$") return -1;
				if (/\s/.test(src[j - 1]!)) continue;
				if (/\d/.test(src[j + 1] ?? "")) continue;
				return j;
			}
		}
		return -1;
	}
	return src.indexOf(d.close, start);
}

const cache = new Map<string, string>();

function mathHtml(tex: string, display: boolean): string {
	const key = `${display ? "D" : "I"}${tex}`;
	let html = cache.get(key);
	if (html === undefined) {
		html = katex.renderToString(tex, { throwOnError: false, displayMode: display, output: "html" });
		if (cache.size > 2000) cache.clear();
		cache.set(key, html);
	}
	return html;
}

/** Renders `text` with its LaTeX runs typeset. Display math renders
 *  inline-block so a short card never breaks into a centered block. */
export function MathText({ text }: { text: string }) {
	const runs = splitMath(text);
	if (runs.length === 1 && runs[0]!.kind === "text") return <>{text}</>;
	return (
		<>
			{runs.map((run, i) =>
				run.kind === "text" ? (
					<Fragment key={i}>{run.text}</Fragment>
				) : (
					<span
						key={i}
						data-math=""
						className={run.display ? "inline-block max-w-full overflow-x-auto align-middle" : undefined}
						// katex.renderToString is the library's own trusted output
						// (the same thing rehype-katex injects for lesson math).
						dangerouslySetInnerHTML={{ __html: mathHtml(run.tex, run.display) }}
					/>
				),
			)}
		</>
	);
}

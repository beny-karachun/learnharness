/** Hebrew edition — graph propositions render their inline LaTeX. */
import React from "react";
(globalThis as Record<string, unknown>).React = React;

import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it } from "node:test";
import { MathText, splitMath } from "../components/math-text.tsx";

describe("splitMath", () => {
	it("splits inline and display math out of text", () => {
		assert.deepEqual(splitMath("אם $Y_{X/O}$ הוא יבול"), [
			{ kind: "text", text: "אם " },
			{ kind: "math", tex: "Y_{X/O}", display: false },
			{ kind: "text", text: " הוא יבול" },
		]);
		assert.deepEqual(splitMath("so $$a=b$$ and \\(c\\) or \\[d\\]"), [
			{ kind: "text", text: "so " },
			{ kind: "math", tex: "a=b", display: true },
			{ kind: "text", text: " and " },
			{ kind: "math", tex: "c", display: false },
			{ kind: "text", text: " or " },
			{ kind: "math", tex: "d", display: true },
		]);
	});
	it("leaves prices, escaped and unclosed dollars as text", () => {
		assert.deepEqual(splitMath("costs $5 and $10"), [{ kind: "text", text: "costs $5 and $10" }]);
		assert.deepEqual(splitMath("a \\$ sign"), [{ kind: "text", text: "a $ sign" }]);
		assert.deepEqual(splitMath("open $x but never closed"), [{ kind: "text", text: "open $x but never closed" }]);
	});
	it("keeps escaped content inside math intact", () => {
		assert.deepEqual(splitMath("$\\frac{dX}{dt}=Y_{X/O}K_La(C^*-C_L)$,"), [
			{ kind: "math", tex: "\\frac{dX}{dt}=Y_{X/O}K_La(C^*-C_L)", display: false },
			{ kind: "text", text: "," },
		]);
	});
});

describe("MathText", () => {
	it("renders math through KaTeX and plain text untouched", () => {
		const html = renderToStaticMarkup(<MathText text="rate $\frac{dX}{dt}$ grows" />);
		assert.match(html, /class="katex"/);
		assert.doesNotMatch(html, /\$/);
		assert.equal(renderToStaticMarkup(<MathText text="no math <b>here</b>" />), "no math &lt;b&gt;here&lt;/b&gt;");
	});
});

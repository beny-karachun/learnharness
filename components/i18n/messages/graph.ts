import { defineMessages } from "../core";

/** Hebrew edition — "graph.*" messages. */
export default defineMessages({
	// ── Shared counts ──────────────────────────────────────────────────────
	"graph.count.nodes": {
		en: { one: "{count} node", other: "{count} nodes" },
		he: { one: "צומת אחד", two: "שני צמתים", other: "{count} צמתים" },
	},
	"graph.count.chains": {
		en: { one: "{count} chain", other: "{count} chains" },
		he: { one: "שרשרת אחת", two: "שתי שרשראות", other: "{count} שרשראות" },
	},
	"graph.count.propositions": {
		en: { one: "{count} proposition", other: "{count} propositions" },
		he: { one: "טענה אחת", two: "שתי טענות", other: "{count} טענות" },
	},
	"graph.count.sources": {
		en: { one: "{count} source", other: "{count} sources" },
		he: { one: "מקור אחד", two: "שני מקורות", other: "{count} מקורות" },
	},
	"graph.count.folders": {
		en: { one: "{count} folder", other: "{count} folders" },
		he: { one: "תיקייה אחת", two: "שתי תיקיות", other: "{count} תיקיות" },
	},
	"graph.count.teachSessions": {
		en: { one: "{count} teaching session", other: "{count} teaching sessions" },
		he: { one: "שיעור לימוד אחד", two: "שני שיעורי לימוד", other: "{count} שיעורי לימוד" },
	},
	"graph.count.practiceSessions": {
		en: { one: "{count} practice session", other: "{count} practice sessions" },
		he: { one: "שיעור תרגול אחד", two: "שני שיעורי תרגול", other: "{count} שיעורי תרגול" },
	},
	"graph.count.importedNotes": {
		en: { one: "{count} imported note", other: "{count} imported notes" },
		he: { one: "סיכום מיובא אחד", two: "שני סיכומים מיובאים", other: "{count} סיכומים מיובאים" },
	},
	"graph.andMore": { en: ", and {count} more", he: ", ועוד {count}" },
	"graph.deleting": { en: "Deleting…", he: "מוחק…" },

	// ── Search + chrome row ────────────────────────────────────────────────
	"graph.search.nodes": { en: "Search nodes", he: "חיפוש צמתים" },
	"graph.search.nodesPlaceholder": { en: "Search nodes…", he: "חיפוש צמתים…" },
	"graph.search.noMatchingNodes": { en: "No matching nodes.", he: "אין צמתים תואמים." },
	"graph.chrome.everyChain": { en: "Every reasoning chain", he: "כל שרשראות ההסקה" },
	"graph.chrome.chains": { en: "Chains", he: "שרשראות" },

	// ── Empty graph ────────────────────────────────────────────────────────
	"graph.empty.title": { en: "Knowledge graph", he: "גרף ידע" },
	"graph.empty.start": { en: "Start a session to begin learning.", he: "התחילו שיעור כדי להתחיל ללמוד." },
	"graph.empty.attach": {
		en: "Attach your material with the paperclip or drag and drop.",
		he: "צרפו את החומר שלכם בעזרת מהדק הנייר או בגרירה ושחרור.",
	},

	// ── Node detail card + pipeline pills ──────────────────────────────────
	"graph.detail.sessions": { en: "Sessions", he: "שיעורים" },
	"graph.detail.noSessions": { en: "No sessions recorded.", he: "לא נרשמו שיעורים." },
	"graph.phase.queued": { en: "queued", he: "בתור" },
	"graph.phase.extracting": { en: "extracting", he: "מחלץ" },
	"graph.phase.waiting": { en: "waiting", he: "ממתין" },
	"graph.phase.auditing": { en: "auditing", he: "בביקורת" },
	"graph.phase.merging": { en: "merging", he: "ממזג" },
	"graph.pipeline.seconds": { en: "{seconds}s", he: "{seconds} שנ׳" },

	// ── Costs ──────────────────────────────────────────────────────────────
	"graph.cost.hint": { en: "Graph costs — click for details", he: "עלויות הגרף — לחצו לפרטים" },
	"graph.cost.title": { en: "Graph pipeline costs", he: "עלויות עיבוד הגרף" },
	"graph.cost.unpricedTotal": { en: " · {count} unpriced", he: " · {count} ללא תמחור" },
	"graph.cost.plusUnpriced": { en: " +{count} unpriced", he: " +{count} ללא תמחור" },
	"graph.cost.stageExtraction": { en: "Extraction", he: "חילוץ" },
	"graph.cost.stageAudit": { en: "Audit", he: "ביקורת" },
	"graph.cost.tokensInOut": { en: "{input} in / {output} out", he: "{input} נכנסים / {output} יוצאים" },
	"graph.cost.mergedNodes": { en: "+{count}n", he: "+{count} צמתים" },
	"graph.timeAgo.minutes": { en: "{count}m", he: "{count} ד׳" },
	"graph.timeAgo.hours": { en: "{count}h", he: "{count} ש׳" },
	"graph.timeAgo.days": { en: "{count}d", he: "{count} י׳" },

	// ── Display settings panel ─────────────────────────────────────────────
	"graph.settings.hint": { en: "Graph display settings", he: "הגדרות תצוגת הגרף" },
	"graph.settings.nodeSize": { en: "Node size", he: "גודל צומת" },
	"graph.settings.edgeWidth": { en: "Edge width", he: "עובי קשת" },
	"graph.settings.arrowheadSize": { en: "Arrowhead size", he: "גודל ראש החץ" },
	"graph.settings.labelSize": { en: "Label size", he: "גודל תווית" },
	"graph.settings.labelsUntilZoom": { en: "Labels until zoom", he: "תוויות עד זום" },
	"graph.settings.regions": { en: "Regions", he: "אזורים" },
	"graph.settings.backgroundColors": { en: "Background colors", he: "צבעי רקע" },
	"graph.settings.dilation": { en: "Dilation", he: "התרחבות" },
	"graph.settings.blur": { en: "Blur", he: "טשטוש" },
	"graph.settings.edgeAlpha": { en: "Edge alpha", he: "שקיפות השוליים" },
	"graph.settings.bitmapResolution": { en: "Bitmap resolution", he: "רזולוציית מפת הסיביות" },
	"graph.settings.clusterLabels": { en: "Cluster labels", he: "תוויות אשכולות" },
	"graph.settings.clusterLabelSize": { en: "Cluster label size", he: "גודל תוויות האשכולות" },
	"graph.settings.physics": { en: "Physics", he: "פיזיקה" },
	"graph.settings.nodeRepulsion": { en: "Node repulsion", he: "דחייה בין צמתים" },
	"graph.settings.edgeAttraction": { en: "Edge attraction", he: "משיכת קשתות" },
	"graph.settings.edgeLength": { en: "Edge length", he: "אורך קשת" },
	"graph.settings.centralPull": { en: "Central pull", he: "משיכה למרכז" },
	"graph.settings.clusterPull": { en: "Cluster pull", he: "משיכת אשכול" },
	"graph.settings.off": { en: "off", he: "כבוי" },
	"graph.settings.friction": { en: "Friction", he: "חיכוך" },
	"graph.settings.depthAnchor": { en: "Depth anchor", he: "עיגון עומק" },
	"graph.settings.depthVertical": { en: "Vertical (up)", he: "אנכי (למעלה)" },
	"graph.settings.depthRadial": { en: "Radial (outward)", he: "רדיאלי (החוצה)" },
	"graph.settings.depthStrength": { en: "Depth strength", he: "עוצמת העומק" },
	"graph.settings.depthSpacing": { en: "Depth spacing", he: "מרווח העומק" },
	"graph.settings.baseRingRadius": { en: "Base ring radius", he: "רדיוס טבעת הבסיס" },

	// ── Chain table ────────────────────────────────────────────────────────
	"graph.chainTable.addFolder": { en: "Add folder", he: "הוספת תיקייה" },
	"graph.chainTable.close": { en: "Close chains", he: "סגירת השרשראות" },
	"graph.chainTable.colName": { en: "Name", he: "שם" },
	"graph.chainTable.colProps": { en: "Props", he: "טענות" },
	"graph.chainTable.colCreated": { en: "Created", he: "נוצר" },
	"graph.chainTable.noMatch": { en: "No matching chains.", he: "אין שרשראות תואמות." },
	"graph.chainTable.unlabeled": { en: "unlabeled", he: "ללא שם" },
	"graph.chainTable.selectBornIn": { en: "Select everything born in {name}", he: "בחירת כל מה שנוצר ב־{name}" },
	"graph.chainTable.selectSource": { en: "Select source {name}", he: "בחירת המקור {name}" },
	"graph.chainTable.expandCluster": { en: "Expand cluster {name}", he: "הרחבת האשכול {name}" },
	"graph.chainTable.expandSource": { en: "Expand source {name}", he: "הרחבת המקור {name}" },
	"graph.chainTable.notesTag": { en: "notes", he: "סיכומים" },
	"graph.chainTable.selectChain": { en: "Select chain {name}", he: "בחירת השרשרת {name}" },
	"graph.chainTable.expandChain": { en: "Expand chain {name}", he: "הרחבת השרשרת {name}" },
	"graph.chainTable.selectNode": { en: "Select node {name}", he: "בחירת הצומת {name}" },
	"graph.chainTable.clear": { en: "Clear", he: "ניקוי" },
	"graph.chainTable.donePicking": {
		en: { one: "Done picking — {count} proposition selected", other: "Done picking — {count} propositions selected" },
		he: {
			one: "סיום הבחירה — נבחרה טענה אחת",
			two: "סיום הבחירה — נבחרו שתי טענות",
			other: "סיום הבחירה — נבחרו {count} טענות",
		},
	},
	"graph.chainTable.done": { en: "Done", he: "סיום" },
	"graph.chainTable.deleteSelected": { en: "Delete selected sources and folders", he: "מחיקת המקורות והתיקיות שנבחרו" },
	"graph.chainTable.readFailed": { en: "Could not read source organization.", he: "לא ניתן לקרוא את ארגון המקורות." },
	"graph.chainTable.saveFailed": { en: "Could not save source organization.", he: "לא ניתן לשמור את ארגון המקורות." },
	"graph.chainTable.deleteFailed": { en: "Could not delete sources.", he: "לא ניתן למחוק את המקורות." },

	// ── Source folder tree ─────────────────────────────────────────────────
	"graph.folders.namePlaceholder": { en: "Folder name", he: "שם התיקייה" },
	"graph.folders.nameAria": { en: "Source or folder name", he: "שם המקור או התיקייה" },
	"graph.folders.rename": { en: "Rename", he: "שינוי שם" },
	"graph.folders.selectFolder": { en: "Select folder {name}", he: "בחירת התיקייה {name}" },
	"graph.folders.selectContents": { en: "Select contents of {name}", he: "בחירת התוכן של {name}" },
	"graph.folders.expandFolder": { en: "Expand folder {name}", he: "הרחבת התיקייה {name}" },
	"graph.folders.moveOutside": { en: "Move outside folders", he: "העברה אל מחוץ לתיקיות" },

	// ── Graph-context card ─────────────────────────────────────────────────
	"graph.contextCard.title": { en: "Graph context", he: "הקשר מהגרף" },

	// ── Delete sources dialog ──────────────────────────────────────────────
	"graph.deleteSource.aria": { en: "Delete sources", he: "מחיקת מקורות" },
	"graph.deleteSource.title": { en: "Delete selected sources and folders?", he: "למחוק את המקורות והתיקיות שנבחרו?" },
	"graph.deleteSource.contributions": {
		en: "Removes these sources’ contributions to propositions and reasoning chains. Knowledge supported by other sources survives; knowledge supported only by these sources is removed.",
		he: "מסיר את התרומה של המקורות האלה לטענות ולשרשראות ההסקה. ידע שנתמך גם במקורות אחרים נשמר; ידע שנתמך רק במקורות האלה יוסר.",
	},
	"graph.deleteSource.records": {
		en: "Imported source records are removed, but original files on disk are never changed. Selected folders are removed only when empty; folders needed by kept sessions remain.",
		he: "רשומות המקור המיובאות יוסרו, אבל הקבצים המקוריים בדיסק לעולם לא ישתנו. תיקיות שנבחרו יוסרו רק אם הן ריקות; תיקיות שדרושות לשיעורים שנשמרים יישארו.",
	},
	"graph.deleteSource.alsoSessions": {
		en: { one: "Also delete the {count} selected session", other: "Also delete the {count} selected sessions" },
		he: {
			one: "למחוק גם את השיעור שנבחר",
			two: "למחוק גם את שני השיעורים שנבחרו",
			other: "למחוק גם את {count} השיעורים שנבחרו",
		},
	},
	"graph.deleteSource.sessionsExplain": {
		en: "Unchecked, conversations stay in their current folders and can be extracted again. Either way, their graph contributions and extraction coverage are cleared. Checking this also permanently deletes their messages and background jobs.",
		he: "בלי סימון, השיחות נשארות בתיקיות הנוכחיות שלהן ואפשר לחלץ אותן שוב. בכל מקרה, התרומה שלהן לגרף וכיסוי החילוץ שלהן יימחקו. סימון האפשרות מוחק לצמיתות גם את ההודעות שלהן ואת המשימות ברקע.",
	},

	// ── Delete node dialog ─────────────────────────────────────────────────
	"graph.deleteNode.aria": { en: "Delete node", he: "מחיקת צומת" },
	"graph.deleteNode.titleWithFolders": {
		en: "Delete nodes and remove empty folders?",
		he: "למחוק את הצמתים ולהסיר את התיקיות הריקות?",
	},
	"graph.deleteNode.titleFoldersOnly": { en: "Remove empty folders?", he: "להסיר את התיקיות הריקות?" },
	"graph.deleteNode.title": {
		en: { one: "Delete node?", other: "Delete {count} nodes?" },
		he: { one: "למחוק את הצומת?", two: "למחוק שני צמתים?", other: "למחוק {count} צמתים?" },
	},
	"graph.deleteNode.emptyFolders": { en: "Empty folders: {names}", he: "תיקיות ריקות: {names}" },
	"graph.deleteNode.permanence": {
		en: {
			one: "This permanently deletes the node — this cannot be undone.",
			other: "This permanently deletes all {count} nodes — this cannot be undone.",
		},
		he: {
			one: "פעולה זו מוחקת את הצומת לצמיתות — אי אפשר לבטל אותה.",
			two: "פעולה זו מוחקת את שני הצמתים לצמיתות — אי אפשר לבטל אותה.",
			other: "פעולה זו מוחקת את כל {count} הצמתים לצמיתות — אי אפשר לבטל אותה.",
		},
	},
	"graph.deleteNode.onlyNamedFolders": {
		en: "Only the named empty folders are removed. ",
		he: "רק התיקיות הריקות שצוינו יוסרו. ",
	},
	"graph.deleteNode.kept": {
		en: "Sessions, imported source records, and non-empty folders are kept.",
		he: "שיעורים, רשומות מקור מיובאות ותיקיות שאינן ריקות נשמרים.",
	},
	"graph.deleteNode.extractionRunning": {
		en: "An extraction is running — try again when the activity dock drains.",
		he: "חילוץ פועל כרגע — נסו שוב כשלוח הפעילות יתרוקן.",
	},
	"graph.deleteNode.failedStatus": { en: "Delete failed ({status})", he: "המחיקה נכשלה ({status})" },
	"graph.deleteNode.folderRemovalUnavailable": { en: "Folder removal is unavailable.", he: "הסרת תיקיות אינה זמינה." },
	"graph.deleteNode.networkError": {
		en: "Delete failed — network error. Try again.",
		he: "המחיקה נכשלה — שגיאת רשת. נסו שוב.",
	},

	// ── Notes import ───────────────────────────────────────────────────────
	"graph.import.hint": { en: "Extract files into the graph", he: "חילוץ קבצים לגרף" },
	"graph.import.extracting": { en: "Extracting…", he: "מחלץ…" },
	"graph.import.button": { en: "Extract files…", he: "חילוץ קבצים…" },
	"graph.import.lessonsHint": {
		en: "For lessons, attach material to a session instead.",
		he: "לשיעורים, צרפו את החומר לשיעור עצמו.",
	},
	"graph.import.files": { en: "Files", he: "קבצים" },
	"graph.import.folder": { en: "Folder", he: "תיקייה" },
	"graph.import.invalidResponse": {
		en: "Invalid import response. Check the graph before retrying.",
		he: "תגובת הייבוא אינה תקינה. בדקו את הגרף לפני ניסיון חוזר.",
	},
	"graph.import.requestFailed": {
		en: "Import request failed (HTTP {status}){detail}{period} Check the graph before retrying.",
		he: "בקשת הייבוא נכשלה (HTTP {status}){detail}{period} בדקו את הגרף לפני ניסיון חוזר.",
	},
	"graph.import.unsupported": {
		en: "Unsupported format or unsafe relative path.",
		he: "פורמט לא נתמך או נתיב יחסי לא בטוח.",
	},
	"graph.import.tooBig": { en: "Too big. Max 25 MB.", he: "גדול מדי. מקסימום 25 MB." },

	// ── Extraction coverage ────────────────────────────────────────────────
	"graph.coverage.extracting": { en: "extracting…", he: "מחלץ…" },
	"graph.coverage.fullyExtracted": { en: "fully extracted", he: "חולץ במלואו" },
	"graph.coverage.tokUncovered": { en: "{tokens} tok uncovered", he: "{tokens} טוקנים לא מכוסים" },
	"graph.coverage.messagesUnextracted": {
		en: { one: "{count} message unextracted", other: "{count} messages unextracted" },
		he: { one: "הודעה אחת לא חולצה", two: "שתי הודעות לא חולצו", other: "{count} הודעות לא חולצו" },
	},
	"graph.coverage.running": { en: "Running", he: "פועל" },
	"graph.coverage.extract": { en: "Extract", he: "חילוץ" },
	"graph.coverage.ringHint": {
		en: "How much of this session isn't mapped yet",
		he: "כמה מהשיעור הזה עוד לא מופה",
	},
	"graph.coverage.title": { en: "Extraction coverage", he: "כיסוי החילוץ" },
	"graph.coverage.uncovered": { en: "Uncovered", he: "לא מכוסה" },
	"graph.coverage.covered": { en: "Covered", he: "מכוסה" },
	"graph.coverage.tokens": { en: "{tokens} tokens", he: "{tokens} טוקנים" },
	"graph.coverage.messages": { en: "Messages", he: "הודעות" },
	"graph.coverage.chunkThreshold": { en: "Chunk threshold", he: "סף מקטע" },
	"graph.coverage.lastExtraction": { en: "Last extraction", he: "חילוץ אחרון" },
	"graph.coverage.status": { en: "Status", he: "מצב" },

	// ── Home composer ──────────────────────────────────────────────────────
	"graph.home.setUpModels": { en: "Set up your models", he: "הגדירו את המודלים שלכם" },
	"graph.home.placeholderPractice": { en: "What do you want to practice?", he: "מה תרצו לתרגל?" },
	"graph.home.placeholderLearn": { en: "What do you want to learn?", he: "מה תרצו ללמוד?" },
	"graph.home.startSession": { en: "Start session", he: "התחלת שיעור" },
	"graph.home.modeTeach": { en: "Teach", he: "לימוד" },
	"graph.home.modePractice": { en: "Practice", he: "תרגול" },

	// ── Stats bar ──────────────────────────────────────────────────────────
	"graph.stats.title": { en: "Session stats", he: "נתוני השיעור" },
	"graph.stats.context": { en: "Context (last call)", he: "הקשר (קריאה אחרונה)" },
	"graph.stats.cliWindow": {
		en: "Window reported by Claude Code; may be lower for auto-compaction.",
		he: "החלון כפי שדווח על ידי Claude Code; ייתכן שיהיה קטן יותר בגלל דחיסה אוטומטית.",
	},
	"graph.stats.usage": { en: "Usage", he: "שימוש" },
	"graph.stats.totalCost": { en: "Total cost", he: "עלות כוללת" },
	"graph.stats.cacheHitRate": { en: "Cache hit rate", he: "שיעור הפגיעות במטמון" },
	"graph.stats.manageChatGPT": { en: "Manage ChatGPT usage", he: "ניהול השימוש ב־ChatGPT" },
	"graph.stats.unpricedTurns": { en: "Unpriced turns", he: "סבבים ללא תמחור" },
	"graph.stats.turns": { en: "Turns", he: "סבבים" },
	"graph.stats.steps": {
		en: { other: "{count} steps" },
		he: { one: "צעד אחד", two: "שני צעדים", other: "{count} צעדים" },
	},

	// ── Plan diagram + popup ───────────────────────────────────────────────
	"graph.plan.diagram": { en: "Plan diagram", he: "תרשים התוכנית" },
	"graph.plan.openFull": { en: "Open the full plan", he: "פתיחת התוכנית המלאה" },
	"graph.plan.fullPlan": { en: "The full plan", he: "התוכנית המלאה" },
	"graph.plan.title": { en: "The plan", he: "התוכנית" },
	"graph.plan.liveNote": {
		en: "live — statuses derive from your check outcomes",
		he: "חי — המצבים נגזרים מתוצאות הבדיקות שלכם",
	},
	"graph.plan.panZoomHint": { en: "Drag to pan · scroll to zoom", he: "גררו להזזה · גללו לזום" },
	"graph.plan.zoomOut": { en: "Zoom out", he: "התרחקות" },
	"graph.plan.fit": { en: "Fit plan to screen", he: "התאמת התוכנית למסך" },
	"graph.plan.zoomIn": { en: "Zoom in", he: "התקרבות" },
	"graph.plan.empty": { en: "No plan in this session yet.", he: "אין עדיין תוכנית בשיעור הזה." },
});

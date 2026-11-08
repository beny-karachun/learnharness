/** Hebrew edition — every message module, merged. Each area module owns its
 *  key prefix ("graph.*", "settings.*", "session.*", "shell.*"); "common.*"
 *  holds shared words. Duplicate keys across modules are a bug. */
import common from "./messages/common";
import graph from "./messages/graph";
import session from "./messages/session";
import settings from "./messages/settings";
import shell from "./messages/shell";

export const catalog = {
	...common,
	...graph,
	...session,
	...settings,
	...shell,
};

export type MessageKey = keyof typeof catalog;

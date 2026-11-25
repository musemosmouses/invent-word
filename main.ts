// invent-word: one invented English word with a one-line definition.
// Deterministic, no network: the entry is a fixed string, written
// verbatim to entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry (96 chars, one line): phontom, phone + phantom — the jolt of
// panic when you cannot find your phone while holding it in your other hand.
const COINAGE =
  "phontom — the jolt of panic when you cannot find your phone while holding it in your other hand.";

// The gate: entry.txt must be UTF-8 text of 1 to 140 characters, a single
// line, not only whitespace. Fail loudly here rather than shipping an
// invalid entry.
const MIN_LEN = 1;
const MAX_LEN = 140;
if (COINAGE.length < MIN_LEN || COINAGE.length > MAX_LEN) {
  throw new Error(`entry violates the 1-140 char gate: ${COINAGE.length} chars`);
}
if (COINAGE.trim().length === 0 || COINAGE.includes("\n")) {
  throw new Error("entry must be a non-blank single line");
}

// The grader mounts its output dir at MAKEFUN_OUTPUT_DIR; locally the same
// run writes to ./out. No trailing newline: the file holds exactly the
// entry, one line, 96 characters.
function run(): void {
  const targetDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(join(targetDir, "entry.txt"), COINAGE, "utf8");
}

run();

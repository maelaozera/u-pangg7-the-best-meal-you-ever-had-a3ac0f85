import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The best meal I ever had, in one sentence.
const WORDS = [
  "My grandmother's rendang, slow-cooked for six hours until the beef",
  "fell apart in coconut gravy so dark and rich I scraped the pot",
  "clean with my fingers at her kitchen table in Bandung.",
];

const MAX_CHARS = 200;

function buildEntry(): string {
  return WORDS.join(" ");
}

function validateEntry(text: string): void {
  if (text.length === 0 || text.trim().length === 0) {
    throw new Error("entry must not be empty");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} characters, over the ${MAX_CHARS} limit`);
  }
  const sentences = text.split(/[.!?]+/).filter((part) => part.trim().length > 0);
  if (sentences.length !== 1) {
    throw new Error("entry must be exactly one sentence");
  }
}

function writeEntry(text: string, outputPath: string): void {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, text, "utf8");
}

function main(): void {
  const outputPath = process.argv[2] ?? "/output/entry.txt";
  const entry = buildEntry();
  validateEntry(entry);
  writeEntry(entry, outputPath);
}

main();

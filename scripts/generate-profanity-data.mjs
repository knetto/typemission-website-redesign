import {createRequire} from "node:module";
import {readFileSync, writeFileSync} from "node:fs";
import {resolve} from "node:path";
import {cuss as cussEn} from "cuss";
import {cuss as cussArabicLatin} from "cuss/ar-latn";
import {cuss as cussEs} from "cuss/es";
import {cuss as cussFr} from "cuss/fr";
import {cuss as cussIt} from "cuss/it";
import {cuss as cussPt} from "cuss/pt";
import {cuss as cussPtPt} from "cuss/pt-pt";

const require = createRequire(import.meta.url);
const naughtyWords = require("naughty-words");
const nlBeDataset = JSON.parse(readFileSync(
  resolve(process.cwd(), "scripts", "profanity-datasets", "nl-be-high-confidence.json"),
  "utf8"
));

const lookalikeMap = {
  "0": "o", "1": "i", "2": "z", "3": "e", "4": "a", "5": "s",
  "6": "g", "7": "t", "8": "b", "9": "g", "@": "a", "$": "s", "!": "i",
  "ß": "ss", "æ": "ae", "œ": "oe", "ø": "o", "ł": "l", "đ": "d", "ð": "d", "þ": "th",
  "а": "a", "е": "e", "о": "o", "р": "p", "с": "c", "х": "x", "у": "y",
  "і": "i", "ј": "j", "ѕ": "s", "κ": "k", "ο": "o", "ρ": "p", "χ": "x",
  "υ": "y", "ι": "i", "ν": "v"
};

function normalizeTerm(value) {
  return String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("en-US")
    .split("")
    .map(character => lookalikeMap[character] || character)
    .join("")
    .replace(/[^\p{L}]/gu, "")
    .replace(/(.)\1{2,}/gu, "$1");
}

const cussLists = [cussEn, cussArabicLatin, cussEs, cussFr, cussIt, cussPt, cussPtPt];
const highConfidenceCussTerms = cussLists.flatMap(list =>
  Object.entries(list)
    .filter(([, certainty]) => certainty === 2)
    .map(([term]) => term)
);

const allNaughtyWordsTerms = Object.values(naughtyWords).flat();
const terms = [...new Set([...allNaughtyWordsTerms, ...highConfidenceCussTerms, ...nlBeDataset.exactTerms]
  .map(normalizeTerm)
  .filter(term => term.length >= 2 && term.length <= 15))]
  .sort((a, b) => a.localeCompare(b, "en"));

const embeddedTerms = [...new Set(nlBeDataset.embeddedTerms
  .map(normalizeTerm)
  .filter(term => term.length >= 4 && term.length <= 15))]
  .sort((a, b) => a.localeCompare(b, "en"));

const source = `/*
 * Generated file — do not edit by hand.
 * Run: npm run generate:profanity-data
 * Sources:
 * - cuss 2.2.0 (MIT), certainty level 2 only
 * - naughty-words 1.2.0 (CC BY 4.0), all supplied languages
 * - local NL/BE high-confidence additions (project-maintained)
 * See THIRD_PARTY_NOTICES.md for attribution and licenses.
 * Normalized unique terms: ${terms.length}
 */
globalThis.TYPEMISSION_PROFANITY_TERMS = Object.freeze(${JSON.stringify(terms)});
globalThis.TYPEMISSION_PROFANITY_EMBEDDED_TERMS = Object.freeze(${JSON.stringify(embeddedTerms)});
`;

const outputPath = resolve(process.cwd(), "leaderboard-iframe", "profanity-data.js");
writeFileSync(outputPath, source, "utf8");
console.log(`Generated ${terms.length} normalized profanity terms in ${outputPath}`);

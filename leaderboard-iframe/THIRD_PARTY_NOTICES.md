# Third-party profanity data

`profanity-data.js` is generated from these version-pinned datasets:

## cuss 2.2.0

- Project: https://github.com/words/cuss
- Copyright: Titus Wormer and contributors
- License: MIT — https://github.com/words/cuss/blob/main/license
- Usage here: only entries with certainty rating `2` (likely profanity, unlikely clean usage).

## List of Dirty, Naughty, Obscene, and Otherwise Bad Words / naughty-words 1.2.0

- Project: https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words
- Copyright: 2012–2020 Shutterstock, Inc. and contributors
- License: Creative Commons Attribution 4.0 International — https://creativecommons.org/licenses/by/4.0/
- Usage here: the supplied multilingual lists, normalized for nickname matching.

These datasets are subjective aids, not an official or exhaustive definition of abusive language.

## Project-maintained NL/BE additions

`scripts/profanity-datasets/nl-be-high-confidence.json` supplements the upstream datasets with
high-confidence Dutch and Belgian disease insults, common variants, diminutives and plurals.
This local list is maintained as part of this project and has no additional third-party license.

(function initTypeMissionNameModeration(root) {
  "use strict";

  const blockedTerms = new Set(root.TYPEMISSION_PROFANITY_TERMS || []);
  const embeddedTerms = Object.freeze([...(root.TYPEMISSION_PROFANITY_EMBEDDED_TERMS || [])]);
  const lookalikeMap = {
    "0": "o", "1": "i", "2": "z", "3": "e", "4": "a", "5": "s",
    "6": "g", "7": "t", "8": "b", "9": "g", "@": "a", "$": "s", "!": "i",
    "\u00df": "ss", "\u00e6": "ae", "\u0153": "oe", "\u00f8": "o", "\u0142": "l", "\u0111": "d", "\u00f0": "d", "\u00fe": "th",
    "\u0430": "a", "\u0435": "e", "\u043e": "o", "\u0440": "p", "\u0441": "c", "\u0445": "x", "\u0443": "y",
    "\u0456": "i", "\u0458": "j", "\u0455": "s", "\u03ba": "k", "\u03bf": "o", "\u03c1": "p", "\u03c7": "x",
    "\u03c5": "y", "\u03b9": "i", "\u03bd": "v"
  };

  function normalizeName(name, keepWildcards = false) {
    return String(name || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLocaleLowerCase("en-US")
      .split("")
      .map(character => lookalikeMap[character] || character)
      .join("")
      .replace(keepWildcards ? /[^\p{L}*?#]/gu : /[^\p{L}]/gu, "")
      .replace(/(.)\1{2,}/gu, "$1");
  }

  function expandWildcards(name) {
    const wildcardCount = (name.match(/[\*?#]/g) || []).length;
    if (!wildcardCount || wildcardCount > 2) return [name.replace(/[\*?#]/g, "")];

    return name.split("").reduce((variants, character) => {
      if (!/[\*?#]/.test(character)) return variants.map(variant => variant + character);
      const replacements = ["", ..."abcdefghijklmnopqrstuvwxyz"];
      return variants.flatMap(variant => replacements.map(replacement => variant + replacement));
    }, [""]);
  }

  function containsBlockedTerm(name) {
    const candidates = new Set();

    function addCandidates(value) {
      const normalized = normalizeName(value);
      const withoutDigits = normalizeName(String(value || "").replace(/\d/g, ""));
      [normalized, withoutDigits].forEach(candidate => {
        if (!candidate) return;
        candidates.add(candidate);
        candidates.add(candidate.replace(/(.)\1+/gu, "$1"));
      });
      expandWildcards(normalizeName(value, true)).forEach(candidate => candidates.add(candidate));
    }

    addCandidates(name);
    String(name || "")
      .split(/[^\p{L}\p{N}*?#@$!]+/u)
      .filter(Boolean)
      .forEach(addCandidates);

    return [...candidates].some(candidate =>
      candidate && (
        blockedTerms.has(candidate) ||
        embeddedTerms.some(term => candidate.includes(term))
      )
    );
  }

  function validateName(name) {
    const cleanedName = String(name || "").trim().replace(/\s+/g, " ");

    if (cleanedName.length < 2 || cleanedName.length > 15) {
      return { valid: false, message: "Gebruik een spionnennaam van 2 tot en met 15 tekens." };
    }

    if (containsBlockedTerm(cleanedName)) {
      return {
        valid: false,
        message: "Deze naam kan niet worden gebruikt. Kies een nette spionnennaam zonder scheldwoorden of verborgen tekens."
      };
    }

    const hasAllowedFormat = /^[\p{L}\p{N}]+(?:[ '\-][\p{L}\p{N}]+)*$/u.test(cleanedName);
    if (!hasAllowedFormat || /^\p{N}+$/u.test(cleanedName)) {
      return {
        valid: false,
        message: "Gebruik letters en eventueel cijfers, spaties, een streepje of apostrof. Alleen cijfers zijn niet toegestaan."
      };
    }

    return { valid: true, name: cleanedName };
  }

  const api = Object.freeze({ containsBlockedTerm, normalizeName, validateName });
  root.TYPEMISSION_NAME_MODERATION = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
})(globalThis);

const test = require("node:test");
const assert = require("node:assert/strict");

require("../leaderboard-iframe/profanity-data.js");
const moderation = require("../leaderboard-iframe/name-moderation.js");

test("blocks Dutch disease insults and identity abuse", () => {
  const blockedNames = [
    "tering jood",
    "kanker",
    "K4NK3R",
    "k.a.n.k.e.r",
    "teeering",
    "tyfuslijer",
    "pleurisjoch",
    "kankerkop"
  ];

  blockedNames.forEach(name => {
    assert.equal(moderation.validateName(name).valid, false, `${name} should be blocked`);
  });
});

test("blocks Dutch diminutives, plurals and compounds", () => {
  const blockedNames = [
    "kont",
    "kontje",
    "konten",
    "agentkontje",
    "billen",
    "pik",
    "pikje",
    "pikkie",
    "superpikje"
  ];

  blockedNames.forEach(name => {
    assert.equal(moderation.validateName(name).valid, false, `${name} should be blocked`);
  });
});

test("does not turn short Dutch stems into broad substring matches", () => {
  const allowedNames = ["Spike", "Pikachu", "Billie", "Kantoor", "Agent Nova"];

  allowedNames.forEach(name => {
    assert.equal(moderation.validateName(name).valid, true, `${name} should be allowed`);
  });
});

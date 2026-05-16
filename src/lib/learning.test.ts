import { describe, expect, it } from "vitest";
import {
  LEARN_WORDS_COUNT,
  calculateProgress,
  getLearnWords,
  seededRandom,
  shuffleAnswers,
  type Word,
} from "./learning";

const fixtureWords: Word[] = Array.from({ length: 12 }, (_value, index) => ({
  eng: `eng-${index}`,
  ua: `ua-${index}`,
  ru: `ru-${index}`,
}));

describe("learning helpers", () => {
  it("chunks words into a learn set and resets the local index", () => {
    const learnWords = getLearnWords(fixtureWords, "ua", 2);

    expect(learnWords).toHaveLength(LEARN_WORDS_COUNT);
    expect(learnWords[0]).toMatchObject({
      idx: 0,
      stage: -1,
      stageLang: "ua",
      word: fixtureWords[2],
    });
    expect(learnWords[9]).toMatchObject({
      idx: 9,
      word: fixtureWords[11],
    });
  });

  it("calculates progress from stage values", () => {
    const learnWords = getLearnWords(fixtureWords, "ua", 0);
    learnWords[0].stage = 3;
    learnWords[1].stage = 3;
    learnWords[2].stage = 1;

    expect(calculateProgress(learnWords)).toBe(23);
  });

  it("shuffles deterministically for a given seed", () => {
    const items = ["a", "b", "c", "d"];

    expect(shuffleAnswers(items, 42)).toEqual(shuffleAnswers(items, 42));
    expect(shuffleAnswers(items, 42)).not.toEqual(shuffleAnswers(items, 43));
  });

  it("returns a stable seeded random value", () => {
    expect(seededRandom(123)).toBeCloseTo(seededRandom(123));
    expect(seededRandom(123)).not.toBe(seededRandom(124));
  });
});

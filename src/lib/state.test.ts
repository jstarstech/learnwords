import { beforeEach, describe, expect, it } from "vitest";
import { DEFAULT_LANG, createInitialState, stateReducer } from "./state";
import {
  LEARN_WORDS_COUNT,
  calculateProgress,
  getLearnWords,
  type Word,
} from "./learning";

const fixtureWords: Word[] = Array.from({ length: 20 }, (_value, index) => ({
  eng: `eng-${index}`,
  ua: `ua-${index}`,
  ru: `ru-${index}`,
}));

describe("createInitialState", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("builds a fresh learn set when nothing is stored", () => {
    const state = createInitialState(fixtureWords);

    expect(state.learnWords).toHaveLength(LEARN_WORDS_COUNT);
    expect(state.wordsStartIdx).toBe(0);
    expect(state.currentIdx).toBe(0);
    expect(state.progress).toBe(0);
    expect(state.isFinished).toBe(false);
    expect(state.lang).toBe(DEFAULT_LANG);
    expect(localStorage.getItem("learnWords")).not.toBeNull();
  });

  it("self-heals when the stored learn set is empty or invalid", () => {
    localStorage.setItem("wordsStartIdx", "10");
    localStorage.setItem("learnWords", "[]");

    const state = createInitialState(fixtureWords);

    expect(state.wordsStartIdx).toBe(0);
    expect(state.learnWords).toHaveLength(LEARN_WORDS_COUNT);
    expect(localStorage.getItem("wordsStartIdx")).toBe("0");
  });

  it("falls back to the default language when the stored one is unsupported", () => {
    localStorage.setItem("lang", "fr");

    const state = createInitialState(fixtureWords);

    expect(state.lang).toBe(DEFAULT_LANG);
  });

  it("restores a valid stored learn set and derives progress", () => {
    const stored = getLearnWords(fixtureWords, "ua", 0);
    stored[0].stage = 3;
    stored[1].stage = 1;
    localStorage.setItem("lang", "ua");
    localStorage.setItem("wordsStartIdx", "0");
    localStorage.setItem("learnWords", JSON.stringify(stored));

    const state = createInitialState(fixtureWords);

    expect(state.learnWords[0].stage).toBe(3);
    expect(state.currentIdx).toBe(1);
    expect(state.progress).toBe(calculateProgress(stored));
    expect(state.isFinished).toBe(false);
  });
});

describe("stateReducer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("advances to the next batch", () => {
    const base = createInitialState(fixtureWords);

    const next = stateReducer(
      base,
      { type: "getNextLearnWords", wordsStartIdx: 0 },
      fixtureWords
    );

    expect(next.wordsStartIdx).toBe(LEARN_WORDS_COUNT);
    expect(next.learnWords[0].word.eng).toBe("eng-10");
    expect(next.progress).toBe(0);
    expect(next.isFinished).toBe(false);
  });

  it("finishes when there are no more words to learn", () => {
    const base = createInitialState(fixtureWords);

    const next = stateReducer(
      base,
      { type: "getNextLearnWords", wordsStartIdx: LEARN_WORDS_COUNT },
      fixtureWords
    );

    expect(next.isFinished).toBe(true);
    expect(next.wordsStartIdx).toBe(base.wordsStartIdx);
  });

  it("updates a single word without mutating the previous state", () => {
    const base = createInitialState(fixtureWords);

    const next = stateReducer(
      base,
      { type: "changedWord", learnWord: { ...base.learnWords[2], stage: 2 } },
      fixtureWords
    );

    expect(next.learnWords[2].stage).toBe(2);
    expect(base.learnWords[2].stage).toBe(-1);
  });

  it("restarts the learn set when the language changes", () => {
    const base = createInitialState(fixtureWords);

    const next = stateReducer(
      base,
      { type: "getLearnWords", lang: "ru" },
      fixtureWords
    );

    expect(next.lang).toBe("ru");
    expect(next.wordsStartIdx).toBe(0);
    expect(next.learnWords[0].stageLang).toBe("ru");
    expect(localStorage.getItem("lang")).toBe("ru");
  });
});

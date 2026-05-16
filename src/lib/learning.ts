export const LEARN_WORDS_COUNT = 10;
export const LEARN_ANSWERS_COUNT = 8;

export type Word = {
  [key: string]: string;
  eng: string;
  ua: string;
  ru: string;
};

export type CurrentWord = {
  stage: number;
  word: string;
};

export type LearnWord = {
  idx: number;
  stageLang: string;
  stage: number;
  word: Word;
};

export function getLearnWords(
  words: Word[],
  lang: string,
  startIdx: number
): LearnWord[] {
  return words.slice(startIdx, startIdx + LEARN_WORDS_COUNT).map((word, index) => ({
    idx: index,
    stageLang: lang,
    stage: -1,
    word,
  }));
}

export function calculateProgress(learnWords: LearnWord[]): number {
  const totalStageSum = learnWords.reduce((total, learnWord) => {
    return total + (learnWord.stage === -1 ? 0 : learnWord.stage);
  }, 0);

  return Math.round((100 * totalStageSum) / (LEARN_WORDS_COUNT * 3));
}

export function seededRandom(seed: number) {
  let value = seed | 0;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;

  return (value >>> 0) / 4294967296;
}

export function pickAnswerInsertIndex(seed: number, answerCount: number) {
  const mixedSeed = (seed ^ (seed >>> 16)) >>> 0;
  const nextSeed = (mixedSeed * 1664525 + 1013904223) >>> 0;

  return nextSeed % (answerCount + 1);
}

export function shuffleAnswers<T>(items: T[], seed: number) {
  const result = [...items];
  let nextSeed = seed || 1;

  for (let index = result.length - 1; index > 0; index -= 1) {
    nextSeed = (nextSeed * 1664525 + 1013904223) >>> 0;
    const swapIndex = nextSeed % (index + 1);

    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

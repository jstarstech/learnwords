import {
  CurrentWord,
  LEARN_WORDS_COUNT,
  LearnWord,
  Word,
  calculateProgress,
  getLearnWords,
} from "./learning";

export const DEFAULT_LANG = "ua";
export const SUPPORTED_LANGS = ["ua", "ru"];

export type State = {
  lang: string;
  learnWords: LearnWord[];
  wordsStartIdx: number;
  currentIdx: number;
  currentWord: CurrentWord;
  progress: number;
  isFinished: boolean;
};

type ChangedWord = { type: "changedWord"; learnWord: LearnWord };
type GetLearnWords = { type: "getLearnWords"; lang?: string };
type GetNextLearnWords = {
  type: "getNextLearnWords";
  lang?: string;
  wordsStartIdx: number;
};
type SetCurrentIdx = { type: "setCurrentIdx"; idx: number };
type SetCurrentWord = { type: "setCurrentWord"; currentWord: CurrentWord };
type SetCurrentWordStage = { type: "setCurrentWordStage"; stage: number };
type SetProgress = { type: "setProgress"; progress: number };
type SetIsFinished = { type: "setIsFinished"; isFinished: boolean };
type SetLang = { type: "setLang"; lang: string };

export type StateActions =
  | ChangedWord
  | GetLearnWords
  | GetNextLearnWords
  | SetCurrentIdx
  | SetCurrentWord
  | SetCurrentWordStage
  | SetProgress
  | SetIsFinished
  | SetLang;

export function createInitialState(words: Word[]): State {
  const storedLang = localStorage.getItem("lang");
  const lang =
    storedLang && SUPPORTED_LANGS.includes(storedLang)
      ? storedLang
      : DEFAULT_LANG;

  let wordsStartIdx = 0;

  if (localStorage.getItem("wordsStartIdx")) {
    wordsStartIdx = Number(localStorage.getItem("wordsStartIdx"));
  } else {
    localStorage.setItem("wordsStartIdx", wordsStartIdx.toString());
  }

  const learnWords: LearnWord[] = (() => {
    const storedLearnWords = JSON.parse(
      localStorage.getItem("learnWords") || "null"
    ) as LearnWord[] | null;

    if (!Array.isArray(storedLearnWords) || storedLearnWords.length === 0) {
      wordsStartIdx = 0;
      const freshLearnWords = getLearnWords(words, lang, wordsStartIdx);
      localStorage.setItem("wordsStartIdx", wordsStartIdx.toString());
      localStorage.setItem("learnWords", JSON.stringify(freshLearnWords));
      return freshLearnWords;
    }

    return storedLearnWords;
  })();

  let currentIdx = learnWords.findIndex((learnWord) => learnWord.stage < 3);
  currentIdx = currentIdx > -1 ? currentIdx : 0;

  const progress = calculateProgress(learnWords);

  const currentWord = {
    stage: learnWords[currentIdx].stage,
    word: learnWords[currentIdx].word[learnWords[currentIdx].stageLang],
  };

  const isFinished = progress === 100;

  return {
    lang,
    learnWords,
    wordsStartIdx,
    currentIdx,
    currentWord,
    progress,
    isFinished,
  };
}

export function stateReducer(
  state: State,
  action: StateActions,
  words: Word[]
): State {
  switch (action.type) {
    case "setLang": {
      localStorage.setItem("lang", action.lang);

      return {
        ...state,
        lang: action.lang,
      };
    }
    case "changedWord": {
      const learnWords = state.learnWords.map((t) =>
        t.idx === action.learnWord.idx ? action.learnWord : t
      );

      localStorage.setItem("learnWords", JSON.stringify(learnWords));

      return {
        ...state,
        learnWords,
      };
    }
    case "getLearnWords": {
      const lang = action?.lang ? action.lang : state.lang;
      const wordsStartIdx = 0;
      const learnWords = getLearnWords(words, lang, wordsStartIdx);

      if (action?.lang) {
        localStorage.setItem("lang", lang);
      }

      localStorage.setItem("wordsStartIdx", wordsStartIdx.toString());
      localStorage.setItem("learnWords", JSON.stringify(learnWords));

      return {
        ...state,
        lang,
        wordsStartIdx,
        learnWords,
        currentIdx: 0,
        currentWord: {
          word: learnWords[0].word[learnWords[0].stageLang],
          stage: learnWords[0].stage,
        },
        progress: 0,
        isFinished: false,
      };
    }
    case "getNextLearnWords": {
      const lang = action?.lang ? action.lang : state.lang;
      const nextWordsStartIdx = action.wordsStartIdx + LEARN_WORDS_COUNT;

      if (action?.lang) {
        localStorage.setItem("lang", lang);
      }

      if (nextWordsStartIdx >= words.length) {
        return {
          ...state,
          lang,
          isFinished: true,
        };
      }

      const learnWords = getLearnWords(words, lang, nextWordsStartIdx);

      localStorage.setItem("wordsStartIdx", nextWordsStartIdx.toString());
      localStorage.setItem("learnWords", JSON.stringify(learnWords));

      return {
        ...state,
        lang,
        wordsStartIdx: nextWordsStartIdx,
        learnWords,
        currentIdx: 0,
        currentWord: {
          word: learnWords[0].word[learnWords[0].stageLang],
          stage: learnWords[0].stage,
        },
        progress: 0,
        isFinished: false,
      };
    }
    case "setCurrentIdx": {
      return {
        ...state,
        currentIdx: action.idx,
      };
    }
    case "setCurrentWord": {
      return {
        ...state,
        currentWord: action.currentWord,
      };
    }
    case "setCurrentWordStage": {
      return {
        ...state,
        currentWord: { ...state.currentWord, stage: action.stage },
      };
    }
    case "setProgress": {
      return {
        ...state,
        progress: action.progress,
      };
    }
    case "setIsFinished": {
      return {
        ...state,
        isFinished: action.isFinished,
      };
    }
    default: {
      return state;
    }
  }
}

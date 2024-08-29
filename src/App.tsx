import Grid from "@mui/material/Grid2/Grid2";
import { ThemeProvider } from "@mui/material/styles";
import { useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import words from "./Dictionary.js";
import Home from "./Home.jsx";
import Learn from "./Learn.jsx";
import { CurrentWord, State, StateContext } from "./State.js";
import Words from "./Words.jsx";
import WordsLearned from "./WordsLearned.js";
import Router from "./theme/Router.js";
import { theme } from "./theme/theme.js";

export const DEAFULT_LANG = "ua";
export const LEARN_WORDS_COUNT = 10;
export const LEARN_ANSWERS_COUNT = 8; // Start from 0

export type Word = {
  [key: string]: string;
  eng: string;
  ua: string;
  ru: string;
};

export type LearnWord = {
  idx: number;
  stageLang: string;
  stage: number;
  word: Word;
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
type SetPage = { type: "setPage"; page: string };

export type StateActions =
  | ChangedWord
  | GetLearnWords
  | GetNextLearnWords
  | SetCurrentIdx
  | SetCurrentWord
  | SetCurrentWordStage
  | SetProgress
  | SetIsFinished
  | SetLang
  | SetPage;

export default function App() {
  const [state, stateDispatch] = useReducer(stateReducer, null, (): State => {
    const lang = localStorage.getItem("lang") || DEAFULT_LANG;

    let wordsStartIdx = 0;

    if (localStorage.getItem("wordsStartIdx")) {
      wordsStartIdx = Number(localStorage.getItem("wordsStartIdx"));
    } else {
      localStorage.setItem("wordsStartIdx", wordsStartIdx.toString());
    }

    let learnWords: LearnWord[] = [];

    {
      const _learnWords = JSON.parse(
        localStorage.getItem("learnWords") || "null"
      );

      if (_learnWords === null) {
        learnWords = getLearnWords(lang, wordsStartIdx);

        localStorage.setItem("learnWords", JSON.stringify(learnWords));
      } else {
        learnWords = _learnWords;
      }
    }

    let currentIdx = learnWords.findIndex((learnWord) => learnWord.stage < 3);
    currentIdx = currentIdx > -1 ? currentIdx : 0;

    const totalStageSum = learnWords.reduce((total, learnWord) => {
      return total + (learnWord.stage === -1 ? 0 : learnWord.stage);
    }, 0);

    const progress = Math.round(
      (100 * totalStageSum) / (LEARN_WORDS_COUNT * 3)
    );

    const currentWord = {
      stage: learnWords[currentIdx].stage,
      word: learnWords[currentIdx].word[learnWords[currentIdx].stageLang],
    };

    const isFinished = progress === 100;

    return {
      page: "home",
      lang,
      learnWords,
      wordsStartIdx,
      currentIdx,
      currentWord,
      progress,
      isFinished,
    };
  });

  function getLearnWords(lang: string, startIdx: number): LearnWord[] {
    const _learnWords: LearnWord[] = [];

    for (const [index, word] of Object.entries(
      words.slice(startIdx, startIdx + LEARN_WORDS_COUNT)
    )) {
      _learnWords.push({
        idx: Number(index),
        stageLang: lang,
        stage: -1,
        word,
      });
    }

    return _learnWords;
  }

  function stateReducer(state: State, action: StateActions): State {
    switch (action.type) {
      case "setPage": {
        return {
          ...state,
          page: action.page,
        };
      }
      case "setLang": {
        localStorage.setItem("lang", action.lang);

        return {
          ...state,
          lang: action.lang,
        };
      }
      case "changedWord": {
        state.learnWords = state.learnWords.map((t) => {
          if (t.idx === action.learnWord.idx) {
            return action.learnWord;
          }

          return t;
        });

        localStorage.setItem("learnWords", JSON.stringify(state.learnWords));

        return { ...state };
      }
      case "getLearnWords": {
        const lang = action?.lang ? action.lang : state.lang;

        if (action?.lang) {
          state.lang = lang;
          localStorage.setItem("lang", lang);
        }

        state.wordsStartIdx = 0;
        const _learnWords = getLearnWords(lang, state.wordsStartIdx);

        localStorage.setItem("wordsStartIdx", state.wordsStartIdx.toString());
        localStorage.setItem("learnWords", JSON.stringify(_learnWords));

        // Reset state
        state.progress = 0;
        state.currentIdx = 0;
        state.isFinished = false;

        state.learnWords = _learnWords;
        state.currentWord = {
          word: state.learnWords[state.currentIdx].word[
            state.learnWords[state.currentIdx].stageLang
          ],
          stage: state.learnWords[state.currentIdx].stage,
        };

        return { ...state };
      }
      case "getNextLearnWords": {
        const lang = action?.lang ? action.lang : state.lang;

        if (action?.lang) {
          state.lang = lang;
          localStorage.setItem("lang", lang);
        }

        state.wordsStartIdx = action.wordsStartIdx + LEARN_WORDS_COUNT;
        const _learnWords = getLearnWords(lang, state.wordsStartIdx);

        localStorage.setItem("wordsStartIdx", state.wordsStartIdx.toString());
        localStorage.setItem("learnWords", JSON.stringify(_learnWords));

        // Reset state
        state.progress = 0;
        state.currentIdx = 0;
        state.isFinished = false;

        state.learnWords = _learnWords;
        state.currentWord = {
          word: state.learnWords[state.currentIdx].word[
            state.learnWords[state.currentIdx].stageLang
          ],
          stage: state.learnWords[state.currentIdx].stage,
        };

        return { ...state };
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

  return (
    <ThemeProvider theme={theme}>
      <StateContext.Provider value={{ state, stateDispatch }}>
        <Grid m="auto" size={{ xs: 11, sm: 11, md: 9 }} container>
          <Router>
            <Routes>
              <Route index path="/" element={<Home />} />
              <Route path="learn" element={<Learn />} />
              <Route path="words" element={<Words />} />
              <Route path="wordsLearned" element={<WordsLearned />} />
            </Routes>
          </Router>
        </Grid>
      </StateContext.Provider>
    </ThemeProvider>
  );
}

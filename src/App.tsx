import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useReducer } from "react";
import { Route, Routes } from "react-router";
import words from "./Dictionary.js";
import Home from "./Home.jsx";
import Learn from "./Learn.jsx";
import { State, StateContext } from "./State.js";
import Words from "./Words.jsx";
import WordsLearned from "./WordsLearned.js";
import {
  CurrentWord,
  LearnWord,
  LEARN_WORDS_COUNT,
  calculateProgress,
  getLearnWords,
} from "./lib/learning";
import Router from "./theme/Router.js";
import { theme } from "./theme/theme.js";

export const DEAFULT_LANG = "ua";

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

    const learnWords: LearnWord[] = (() => {
      const storedLearnWords = JSON.parse(
        localStorage.getItem("learnWords") || "null"
      ) as LearnWord[] | null;

      if (storedLearnWords === null) {
        const freshLearnWords = getLearnWords(words, lang, wordsStartIdx);
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

  return (
    <ThemeProvider theme={theme}>
      <StateContext.Provider value={{ state, stateDispatch }}>
        <Grid container size={{ xs: 11, sm: 11, md: 9 }} sx={{ m: "auto" }}>
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

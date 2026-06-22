import { Dispatch, createContext } from "react";
import { CurrentWord, LearnWord } from "./lib/learning";
import { StateActions } from "./App";

export type State = {
  lang: string;
  learnWords: LearnWord[];
  wordsStartIdx: number;
  currentIdx: number;
  currentWord: CurrentWord;
  progress: number;
  isFinished: boolean;
};

const initialState = {
  lang: "",
  learnWords: [],
  wordsStartIdx: 0,
  currentIdx: 0,
  currentWord: {
    stage: 0,
    word: "",
  },
  progress: 0,
  isFinished: false,
};

export const StateContext = createContext<{
  state: State;
  stateDispatch: Dispatch<StateActions>;
}>({ state: initialState, stateDispatch: () => null });

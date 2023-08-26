import { Dispatch, createContext } from 'react';
import { LearnWord, StateActions } from "./App";

export type CurrentWord = {
  stage: number;
  word: string;
};

export type State = {
  page: string;
  lang: string;
  learnWords: LearnWord[];
  wordsStartIdx: number;
  currentIdx: number;
  currentWord: CurrentWord;
  progress: number;
  isFinished: boolean;
};

const InitialState = {
  page: "home",
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
}>({ state: InitialState, stateDispatch: () => null });

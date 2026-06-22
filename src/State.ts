import { Dispatch, createContext } from "react";
import { State, StateActions } from "./lib/state";

const initialState: State = {
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

import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { useReducer } from "react";
import { Route, Routes } from "react-router";
import words from "./Dictionary.js";
import Home from "./Home.jsx";
import Learn from "./Learn.jsx";
import { StateContext } from "./State.js";
import Words from "./Words.jsx";
import WordsLearned from "./WordsLearned.js";
import {
  State,
  StateActions,
  createInitialState,
  stateReducer,
} from "./lib/state";
import Router from "./theme/Router.js";
import { theme } from "./theme/theme.js";

export default function App() {
  const [state, stateDispatch] = useReducer(
    (currentState: State, action: StateActions) =>
      stateReducer(currentState, action, words),
    words,
    createInitialState
  );

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

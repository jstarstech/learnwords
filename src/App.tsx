import { Grid } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Suspense, lazy, useReducer } from "react";
import { Route, Routes } from "react-router";
import words from "./Dictionary.js";
import { StateContext } from "./State.js";
import {
  State,
  StateActions,
  createInitialState,
  stateReducer,
} from "./lib/state";
import Router from "./theme/Router.js";
import { theme } from "./theme/theme.js";

const Home = lazy(() => import("./Home.jsx"));
const Learn = lazy(() => import("./Learn.jsx"));
const Words = lazy(() => import("./Words.jsx"));
const WordsLearned = lazy(() => import("./WordsLearned.js"));

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
            <Suspense fallback={null}>
              <Routes>
                <Route index path="/" element={<Home />} />
                <Route path="learn" element={<Learn />} />
                <Route path="words" element={<Words />} />
                <Route path="wordsLearned" element={<WordsLearned />} />
              </Routes>
            </Suspense>
          </Router>
        </Grid>
      </StateContext.Provider>
    </ThemeProvider>
  );
}

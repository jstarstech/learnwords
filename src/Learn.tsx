import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useContext, useMemo, useRef } from "react";
import AnswerButtons from "./AnswerButtons";
import { LEARN_ANSWERS_COUNT, LEARN_WORDS_COUNT, LearnWord } from "./App";
import CurrentWord from "./CurrentWord";
import { StateContext } from "./State";

export default function Learn() {
  const { state, stateDispatch } = useContext(StateContext);

  const answers = useMemo(() => {
    const _answers = state.learnWords
      .filter((_predicate, index) => index !== state.currentIdx)
      .sort(() => Math.random() - 0.5)
      .slice(0, LEARN_ANSWERS_COUNT);

    _answers.splice(
      ((_answers.length + 1) * Math.random()) | 0,
      0,
      state.learnWords[state.currentIdx]
    );

    return _answers;
  }, [state.currentIdx, state.learnWords]);

  const handleNextAnswer = useRef(true);

  const handleAnswer = (answer: LearnWord) => {
    if (!handleNextAnswer.current) {
      return;
    }

    handleNextAnswer.current = false;

    let timeoutMs = 1000; // 1000 - right answer

    const _learnWords: LearnWord[] = JSON.parse(
      JSON.stringify(state.learnWords)
    );

    if (answer.idx === state.currentIdx) {
      _learnWords[state.currentIdx].stageLang =
        _learnWords[state.currentIdx].stageLang === "eng" ? state.lang : "eng";
      _learnWords[state.currentIdx].stage =
        (_learnWords[state.currentIdx].stage === -1
          ? 0
          : _learnWords[state.currentIdx].stage) + 1;
    } else {
      timeoutMs = 3000; // 3000 wrong answer

      _learnWords[state.currentIdx].stageLang = state.lang;
      _learnWords[state.currentIdx].stage = -1;
    }

    const totalStageSum = _learnWords.reduce((total, learnWord) => {
      return total + (learnWord.stage === -1 ? 0 : learnWord.stage);
    }, 0);
    const _progress = Math.round(
      (100 * totalStageSum) / (LEARN_WORDS_COUNT * 3)
    );
    stateDispatch({
      type: "setProgress",
      progress: _progress,
    });

    stateDispatch({
      type: "setCurrentWordStage",
      stage: _learnWords[state.currentIdx].stage,
    });

    if (_progress === 100) {
      setTimeout(() => {
        stateDispatch({
          type: "setIsFinished",
          isFinished: true,
        });

        stateDispatch({
          type: "changedWord",
          learnWord: _learnWords[state.currentIdx],
        });

        handleNextAnswer.current = true;
      }, timeoutMs);

      return;
    }

    const indexes = _learnWords
      .map((learnWord, index) => (learnWord.stage < 3 ? index : -1))
      .filter((index) => index > -1);

    let nextRandomIdx: number = state.currentIdx;

    if (indexes.length === 1) {
      nextRandomIdx = indexes[0];
    } else {
      while (nextRandomIdx === state.currentIdx) {
        nextRandomIdx = indexes[Math.floor(Math.random() * indexes.length)];
      }
    }

    setTimeout(() => {
      stateDispatch({
        type: "changedWord",
        learnWord: _learnWords[state.currentIdx],
      });

      stateDispatch({
        type: "setCurrentIdx",
        idx: nextRandomIdx,
      });

      stateDispatch({
        type: "setCurrentWord",
        currentWord: {
          word: _learnWords[nextRandomIdx].word[
            _learnWords[nextRandomIdx].stageLang
          ],
          stage: _learnWords[nextRandomIdx].stage,
        },
      });

      handleNextAnswer.current = true;
    }, timeoutMs);
  };

  if (state.isFinished) {
    return (
      <Grid width="100%">
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-purple-600 p-4">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-10 max-w-md w-full text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Well done!
            </h1>

            <div className="flex justify-center mb-6">
              <div className="bg-green-100 rounded-full p-4 inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className="cursor-pointer w-full mt-8 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all"
                onClick={() =>
                  stateDispatch({
                    type: "getNextLearnWords",
                    wordsStartIdx: state.wordsStartIdx,
                  })
                }
              >
                Learn next words
              </Button>

              <Button
                className="flex items-center w-full space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg  transition-all"
                href="/"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      </Grid>
    );
  }

  return (
    <Grid width="100%">
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
        <div className="max-w-2xl mx-auto">
          <CurrentWord
            word={state.currentWord.word}
            stage={state.currentWord.stage}
          />

          <AnswerButtons
            answers={answers}
            rightAnswerIdx={state.currentIdx}
            lang={
              state.learnWords[state.currentIdx].stageLang === "eng"
                ? state.lang
                : "eng"
            }
            handleAnswer={handleAnswer}
          />

          <div className="bg-white rounded-2xl shadow-xl p-8 mt-6 mb-6">
            <Typography
              variant="subtitle1"
              textAlign="center"
              mt={0}
              mb={1}
              sx={{ width: "100%" }}
            >
              {state.progress.toString()}%
            </Typography>
            <LinearProgress
              variant="determinate"
              color="success"
              sx={{ width: "100%" }}
              value={state.progress}
            />
          </div>

          <Box
            display="flex"
            sx={{ my: 2, justifyContent: "flex-start", width: "100%" }}
          >
            <Button
              className="flex items-center space-x-2 bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              startIcon={<ArrowBackIosNewIcon />}
              href="/"
            >
              Home
            </Button>

            <Button
              className="bg-white text-gray-800 font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
              sx={{ ml: "auto", alignSelf: "flex-end" }}
              href="/words"
            >
              Words
            </Button>
          </Box>
        </div>
      </div>
    </Grid>
  );
}

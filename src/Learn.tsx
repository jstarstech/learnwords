import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
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
        <Stack
          spacing={4}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            mt: { xs: 4, md: 6, lg: 8 },
          }}
        >
          <Typography component="h1" variant="h2" color="text.primary">
            Well done
          </Typography>

          <CheckCircleOutlineIcon
            color="success"
            display="flex"
            sx={{ fontSize: 80 }}
          />

          <Button
            variant="outlined"
            color="success"
            size="large"
            onClick={() =>
              stateDispatch({
                type: "getNextLearnWords",
                wordsStartIdx: state.wordsStartIdx,
              })
            }
          >
            Learn next words
          </Button>

          <Button variant="outlined" color="success" size="large" href="/">
            Home
          </Button>
        </Stack>
      </Grid>
    );
  }

  return (
    <Grid width="100%">
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

      <Typography
        variant="subtitle1"
        textAlign="center"
        mt={2}
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

      <Box
        display="flex"
        sx={{ my: 2, justifyContent: "flex-start", width: "100%" }}
      >
        <Button
          variant="outlined"
          color="success"
          startIcon={<ArrowBackIosNewIcon />}
          href="/"
        >
          Home
        </Button>

        <Button
          variant="outlined"
          color="success"
          sx={{ ml: "auto", alignSelf: "flex-end" }}
          href="/words"
        >
          Words
        </Button>
      </Box>
    </Grid>
  );
}

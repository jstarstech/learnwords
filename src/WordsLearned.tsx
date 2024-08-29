import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2/Grid2";
import { useContext, useState } from "react";
import { LearnWord } from "./App.js";
import CircularProgressWithLabel from "./CircularWithValueLabel";
import words from "./Dictionary.js";
import { StateContext } from "./State.js";

export default function WordsLearned() {
  const { state } = useContext(StateContext);

  const [page, setPage] = useState(1);
  const perPage = 8;
  const offset = (page - 1) * perPage;
  const wordsLearned: LearnWord[] = [];

  if (state.wordsStartIdx > 0) {
    const _learnWords: LearnWord[] = [];

    for (const [index, word] of Object.entries(
      words.slice(0, state.wordsStartIdx)
    )) {
      _learnWords.push({
        idx: Number(index),
        stageLang: state.lang,
        stage: 3,
        word,
      });
    }

    wordsLearned.push(..._learnWords);
  }

  wordsLearned.push(
    ...state.learnWords.filter((learnWord) => learnWord.stage === 3)
  );

  const pagesCount = Math.ceil(wordsLearned.length / perPage);
  const _wordsLearned = wordsLearned.slice(offset, offset + perPage);

  return (
    <Grid width="100%">
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        sx={{ my: "20pt" }}
      >
        Words learned
      </Typography>

      <Stack spacing={2} direction="column" alignItems="center">
        {_wordsLearned.map((word, index) => (
          <Box
            key={index}
            component="span"
            width="100%"
            sx={{
              py: 2,
              px: 2,
              border: "1px dashed gray",
              borderRadius: "5px",
              transition: "background 0.5s",
              "&:hover": {
                backgroundColor: "#ededed",
              },
            }}
            display="flex"
            alignItems="center"
          >
            <CircularProgressWithLabel
              value={(100 * (word.stage === -1 ? 0 : word.stage)) / 3}
              valueLabel={(word.stage === -1 ? 0 : word.stage).toString()}
            />
            {word.word.eng}
            <Box component="span" display="flex" ml="auto" color="#a5a5a5">
              {word.word[state.lang]}
            </Box>
          </Box>
        ))}

        <Pagination
          variant="outlined"
          page={page}
          count={pagesCount}
          onChange={(_e, _page) => setPage(_page)}
        />
      </Stack>

      <Box display="flex" sx={{ my: 2, width: "100%" }}>
        <Button
          variant="outlined"
          color="success"
          href="/"
          startIcon={<ArrowBackIosNewIcon />}
        >
          Home
        </Button>
      </Box>
    </Grid>
  );
}

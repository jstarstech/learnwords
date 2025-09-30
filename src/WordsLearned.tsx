import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
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
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-blue-600 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Words learned
            </h2>

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
                  <Box
                    component="span"
                    display="flex"
                    ml="auto"
                    color="#a5a5a5"
                  >
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
                className="flex items-center space-x-2 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all"
                href="/"
                startIcon={<ArrowBackIosNewIcon />}
              >
                Home
              </Button>

              <Button
                className="flex items-center space-x-2 bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all"
                sx={{ ml: "auto", alignSelf: "flex-end" }}
                href="/words"
              >
                Words List
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </Grid>
  );
}

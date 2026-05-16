import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { Grid } from "@mui/material";
import { useContext } from "react";
import words from "./Dictionary";
import { StateContext } from "./State";

export default function MyProgress() {
  const { state } = useContext(StateContext);

  const countCurrent =
    state.wordsStartIdx +
    state.learnWords.reduce(
      (total, learnWord) => (learnWord.stage === 3 ? total + 1 : total),
      0
  );

  const totalProgress = Math.round((countCurrent / words.length) * 100);
  const hasCompletedWords = countCurrent > state.wordsStartIdx;
  const showHint = !hasCompletedWords && state.progress > 0;

  return (
    <>
      <Grid sx={{ width: "100%" }}>
        <div className="mx-auto max-w-2xl py-4 sm:py-8 lg:pt-16">
          <div className="bg-white rounded-2xl shadow-2xl p-8  w-full text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-8">
              Your native language:{" "}
              {state.lang === "ua" ? "Ukrainian" : "Russian"}
            </h1>

            <Grid
              container
              sx={{
                border: "1px dashed gray",
                borderRadius: "5px",
              }}
            >
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack
                  direction="column"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    height: { xs: "90pt", sm: "140pt" },
                  }}
                >
                  <Stack spacing={0} direction="column" sx={{ width: "80%" }}>
                    <Box sx={{ display: "flex", width: "100%", mb: "6pt" }}>
                      Current progress
                      <Box sx={{ ml: "auto", color: "#a5a5a5" }}>
                        {state.progress}%
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      color="success"
                      sx={{ width: "100%" }}
                      value={state.progress}
                    />
                  </Stack>
                  <Stack spacing={0} direction="column" sx={{ width: "80%" }}>
                    <Box sx={{ display: "flex", width: "100%", mb: "6pt" }}>
                      Total progress
                      <Box sx={{ ml: "auto", color: "#a5a5a5" }}>
                        {countCurrent} / {words.length}
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      color="success"
                      sx={{ width: "100%" }}
                      value={totalProgress}
                    />
                  </Stack>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Stack
                  direction="column"
                  sx={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Stack
                    direction="column"
                    sx={{
                      alignItems: "flex-start",
                      justifyContent: "space-evenly",
                      height: { xs: "90pt", sm: "140pt" },
                    }}
                  >
                    <Tooltip
                      title={
                        showHint ? (
                          <Box sx={{ whiteSpace: "pre-line" }}>
                            You have learning in progress,
                            {"\n"}but no completed words yet.
                          </Box>
                        ) : (
                          ""
                        )
                      }
                      placement="top"
                      arrow
                      disableInteractive
                    >
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          width: "fit-content",
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="success"
                          size="medium"
                          href="/wordsLearned"
                          disabled={!hasCompletedWords}
                        >
                          Words learned
                        </Button>
                      </Box>
                    </Tooltip>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>

            <Button
              className="cursor-pointer w-64 mt-8 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all"
              href="/learn"
              sx={{ mx: { xs: "auto" } }}
            >
              Learn words
            </Button>
          </div>
        </div>
      </Grid>
    </>
  );
}

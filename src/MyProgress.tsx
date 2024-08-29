import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid2";
import { useContext } from "react";
import words from "./Dictionary";
import SelectMyLang from "./SelectMyLang";
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

  return (
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
          alignItems="center"
          justifyContent="space-evenly"
          sx={{
            height: { xs: "90pt", sm: "140pt" },
          }}
        >
          <Stack spacing={0} width="80%" direction="column">
            <Box component="span" display="flex" width="100%" mb="6pt">
              Current progress
              <Box component="span" ml="auto" color="#a5a5a5">
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
          <Stack spacing={0} width="80%" direction="column">
            <Box component="span" display="flex" width="100%" mb="6pt">
              Total progress
              <Box component="span" ml="auto" color="#a5a5a5">
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
        <Stack direction="column" alignItems="center" justifyContent="center">
          <Stack
            direction="column"
            alignItems="flex-start"
            justifyContent="space-evenly"
            sx={{
              height: { xs: "90pt", sm: "140pt" },
            }}
          >
            <SelectMyLang selectSize="small" />
            <Button
              variant="outlined"
              color="success"
              size="medium"
              href="/wordsLearned"
              disabled={countCurrent === 0}
            >
              Words learned
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
}

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useContext } from "react";
import MyProgress from "./MyProgress";
import SelectMyLang from "./SelectMyLang";
import { StateContext } from "./State";

export default function Home() {
  const { state } = useContext(StateContext);

  if (state.progress > 0 || state.wordsStartIdx > 0) {
    return (
      <Grid width="100%">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
          sx={{
            pt: { xs: 4, md: 6, lg: 8 },
          }}
        >
          Welcome <br />
          to LearnWords
        </Typography>

        <Box
          sx={{
            mt: { xs: 2, md: 4, lg: 6 },
          }}
        >
          <MyProgress />
        </Box>
        <Stack
          spacing={4}
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            mt: { xs: 2, md: 4, lg: 6 },
          }}
        >
          <Button
            variant="outlined"
            color="success"
            size="large"
            sx={{ my: 2 }}
            href="/learn"
          >
            Learn words
          </Button>
        </Stack>
      </Grid>
    );
  }

  return (
    <Grid width="100%">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{
          pt: { xs: 4, md: 6, lg: 8 },
          pb: { xs: 2, md: 4, lg: 8 },
        }}
      >
        Welcome <br />
        to LearnWords
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        LearnWords is an application that helps you learn English words. The
        learning process is simple. You start with 10 words to learn. Each word
        is displayed three times. Each time, it will be displayed in another
        language. Your progress is saved in your browser storage.
      </Typography>

      <Stack
        spacing={4}
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{
          mt: { xs: 4, md: 6, lg: 8 },
        }}
      >
        <SelectMyLang
          sx={{
            my: 4,
          }}
        />

        <Button
          variant="outlined"
          color="success"
          size="large"
          sx={{ my: 2 }}
          href="/learn"
        >
          Lets get started!
        </Button>
      </Stack>
    </Grid>
  );
}

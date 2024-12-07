import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2/Grid2";
import { useContext, useState } from "react";
import MyProgress from "./MyProgress";
import SelectMyLang from "./SelectMyLang";
import { StateContext } from "./State";

export default function Home() {
  const { state, stateDispatch } = useContext(StateContext);
  const [open, setOpen] = useState(false);

  if (state.progress > 0 || state.wordsStartIdx > 0) {
    const handleConfirm = () => {
      stateDispatch({ type: "getLearnWords" });
      setOpen(false);
    };

    const handleClose = () => {
      setOpen(false);
    };

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

        <Grid
          size={{ xs: 12, sm: 9, md: 12, lg: 9 }}
          m="auto"
          sx={{
            my: { xs: 2, md: 4, lg: 6 },
          }}
        >
          <MyProgress />
        </Grid>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you confirming that you're starting over?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your learning progress will be lost.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="success" onClick={handleClose}>
              No
            </Button>
            <Button color="success" onClick={handleConfirm} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container size={{ xs: 12, sm: 9, md: 12, lg: 9 }} m="auto">
          <Grid
            size={{ xs: 12, sm: 4 }}
            display="flex"
            order={{ xs: 1, sm: 0 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Button
              size="small"
              color="error"
              sx={{
                color: "lightgrey",
                ":hover": { color: "red" },
                mt: { xs: 2, sm: 0 },
                mx: { xs: "auto", sm: 0 },
              }}
              startIcon={<RestartAltIcon />}
              onClick={() => setOpen(true)}
            >
              Start over
            </Button>
          </Grid>
          <Grid
            size={{ xs: 12, sm: 4 }}
            order={{ xs: 0, sm: 1 }}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Button
              variant="outlined"
              color="success"
              size="large"
              href="/learn"
              sx={{ mx: { xs: "auto" } }}
            >
              Learn words
            </Button>
          </Grid>
        </Grid>
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
          Let's get started!
        </Button>
      </Stack>
    </Grid>
  );
}

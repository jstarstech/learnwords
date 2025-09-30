import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
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
      <>
        <Grid width={"100%"}>
          <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="container m-auto grid grid-cols-1">
              <div className="mx-auto max-w-2xl py-4 sm:py-8 lg:pt-16">
                <div className="text-center">
                  <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                    LearnWords
                  </h1>
                  <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8">
                    LearnWords is an application that helps you learn English
                    words.
                  </p>
                  <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8">
                    The learning process is simple. You start with 10 words to
                    learn, and each word is shown three times. Each time, it
                    appears in a different language. Your progress is saved in
                    your browser’s storage.
                  </p>
                </div>
              </div>

              <MyProgress />

              <div className="mx-auto max-w-2xl ">
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
              </div>

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
            </div>
          </div>
        </Grid>
      </>
    );
  }

  return (
    <Grid width={"100%"}>
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="container m-auto grid grid-cols-1">
          <div className="mx-auto max-w-2xl py-4 sm:py-8 lg:pt-16">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                LearnWords
              </h1>
              <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8">
                LearnWords is an application that helps you learn English words.
              </p>
              <p className="mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8">
                The learning process is simple. You start with 10 words to
                learn, and each word is shown three times. Each time, it appears
                in a different language. Your progress is saved in your
                browser’s storage.
              </p>
            </div>
          </div>

          <SelectMyLang />
        </div>
      </div>
    </Grid>
  );
}

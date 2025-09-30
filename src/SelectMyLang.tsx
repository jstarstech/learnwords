import { useContext, useRef, useState } from "react";
import { StateContext } from "./State";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

export default function SelectMyLang() {
  const { state, stateDispatch } = useContext(StateContext);
  const [open, setOpen] = useState(false);
  const selectedLang = useRef(state.lang);

  const handleConfirm = () => {
    stateDispatch({ type: "getLearnWords", lang: selectedLang.current });
    setOpen(false);
  };

  const handleClose = () => {
    selectedLang.current = state.lang;
    setOpen(false);
  };

  function handleSelectLang(value: string) {
    if (state.progress === 0 && state.wordsStartIdx === 0) {
      selectedLang.current = value;
      stateDispatch({ type: "getLearnWords", lang: selectedLang.current });
      return;
    }

    selectedLang.current = value;
    setOpen(true);
  }

  return (
    <div className="mx-auto max-w-2xl pt-4 sm:py-8 lg:py-16">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Your native language:
        </h1>

        <div className="mb-8">
          <div className="space-y-2">
            <button
              // add conditional class for selected state
              className={`w-full p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                state.lang === "ua"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              value={"ua"}
              onClick={() => handleSelectLang("ua")}
            >
              Ukrainian
            </button>
            <button
              className={`w-full p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                state.lang === "ru"
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-300 hover:border-gray-400"
              }"`}
              value={"ru"}
              onClick={() => handleSelectLang("ru")}
            >
              Russian
            </button>
          </div>
        </div>

        <Button
          className="cursor-pointer w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all"
          href="/learn"
        >
          Let's Get Started!
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you confirm language change?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your learning progress will be lost on language change.
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
  );
}

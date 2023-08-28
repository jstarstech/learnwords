import FormControl, { FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext, useRef, useState } from "react";
import { StateContext } from "./State";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import Button from "@mui/material/Button";

export default function SelectMyLang(
  props: FormControlProps & { selectSize?: "small" | "medium" }
) {
  const { state, stateDispatch } = useContext(StateContext);
  const { selectSize, ..._props } = props;
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

  function handleSelectLang(event: SelectChangeEvent) {
    if (state.progress === 0 && state.wordsStartIdx === 0) {
      selectedLang.current = event.target.value;
      stateDispatch({ type: "getLearnWords", lang: selectedLang.current });
      return;
    }

    selectedLang.current = event.target.value;
    setOpen(true);
  }

  return (
    <FormControl {..._props}>
      <InputLabel id="select-lang-label">My language</InputLabel>
      <Select
        size={selectSize ? selectSize : "medium"}
        value={state.lang}
        label="My language"
        onChange={handleSelectLang}
      >
        <MenuItem value={"ua"}>Ukrainian</MenuItem>
        <MenuItem value={"ru"}>Russian</MenuItem>
      </Select>

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
    </FormControl>
  );
}

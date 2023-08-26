import FormControl, { FormControlProps } from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext } from "react";
import { StateContext } from "./State";

export default function SelectMyLang(
  props: FormControlProps & { selectSize?: "small" | "medium" }
) {
  const { state, stateDispatch } = useContext(StateContext);
  const { selectSize, ..._props } = props;

  function handleSelectLang(event: SelectChangeEvent) {
    stateDispatch({ type: "getLearnWords", lang: event.target.value });
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
    </FormControl>
  );
}

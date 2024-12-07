import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2/Grid2";
import { useContext } from "react";
import CircularProgressWithLabel from "./CircularWithValueLabel";
import { StateContext } from "./State.js";

export default function Words() {
  const { state } = useContext(StateContext);

  return (
    <Grid width="100%">
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        sx={{ my: "20pt" }}
      >
        Words you learn
      </Typography>

      <Stack spacing={2} direction="column" alignItems="center">
        {state.learnWords.map((word) => (
          <Box
            key={word.word.eng}
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
      </Stack>

      <Box display="flex" sx={{ my: 2, width: "100%" }}>
        <Button
          variant="outlined"
          color="success"
          startIcon={<ArrowBackIosNewIcon />}
          href="/"
        >
          Learn words
        </Button>

        <Button
          variant="outlined"
          color="success"
          sx={{ ml: "auto", alignSelf: "flex-end" }}
          href="/"
        >
          Home
        </Button>
      </Box>
    </Grid>
  );
}

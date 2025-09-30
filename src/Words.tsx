import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Grid } from "@mui/material";
import { useContext } from "react";
import CircularProgressWithLabel from "./CircularWithValueLabel";
import { StateContext } from "./State.js";

export default function Words() {
  const { state } = useContext(StateContext);

  return (
    <Grid width="100%">
      <div className="min-h-screen bg-gradient-to-br from-teal-500 to-blue-600 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Words you learn
            </h2>

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
            </Stack>

            <Box display="flex" sx={{ mt: 4, width: "100%" }}>
              <Button
                className="flex items-center space-x-2 bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-all"
                startIcon={<ArrowBackIosNewIcon />}
                href="/learn"
              >
                Learn words
              </Button>

              <Button
                className="flex items-center space-x-2 bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition-all"
                sx={{ ml: "auto", alignSelf: "flex-end" }}
                href="/"
              >
                Home
              </Button>
            </Box>
          </div>
        </div>
      </div>
    </Grid>
  );
}

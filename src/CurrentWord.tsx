import Step from "@mui/material/Step";
import StepConnector from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2/Grid2";
import CustomStepIcon from "./CustomStepIcon.jsx";

interface CurrentWordProps {
  word: string;
  stage: number;
}

export default function CurrentWord({ word, stage }: CurrentWordProps) {
  const steps = ["1", "2", "3"];

  return (
    <Grid container width="100%" direction={"column"} alignItems={"center"}>
      <Typography
        variant="h4"
        component="h2"
        textAlign="center"
        sx={{ my: "20pt" }}
      >
        {word}
      </Typography>

      <Grid
        size={{
          xs: 6,
          sm: 6,
          md: 4,
        }}
        sx={{
          mb: "20pt",
        }}
      >
        <Stepper
          activeStep={stage}
          alternativeLabel
          connector={
            <StepConnector
              sx={{
                "& .MuiStepConnector-line": {
                  borderColor: "#2e7d32",
                },
              }}
            />
          }
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={CustomStepIcon}></StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
}

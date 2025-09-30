import Step from "@mui/material/Step";
import StepConnector from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import CustomStepIcon from "./CustomStepIcon.jsx";

interface CurrentWordProps {
  word: string;
  stage: number;
}

export default function CurrentWord({ word, stage }: CurrentWordProps) {
  const steps = ["1", "2", "3"];

  return (
    <>
      <div className="text-center mb-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-4xl text-gray-800 mb-4">{word}</h2>
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
        </div>
      </div>
    </>
  );
}

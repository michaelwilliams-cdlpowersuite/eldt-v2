import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import * as React from "react";
import FormActionButtons from "./components/FormActionButtons";
import { steps } from "./enums/steps";
import Step4 from "./Step4";
import useValidateCurrentStep from "./enums/useValidateCurrentStep";
import { enqueueSnackbar } from "notistack";
import { snackOptions } from "./enums/snackOptions";

interface StepperOrchestrationProps {}

// This code is lifted from the MUI Stepper example
// https://mui.com/material-ui/react-stepper/#linear
const StepperOrchestration: React.FC<StepperOrchestrationProps> = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const validateCurrentStep = useValidateCurrentStep();

  const isStepOptional = (step: number) => {
    // return step === 1;
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const isLastStep = activeStep === steps.length - 1;

  const handleNextStep = async () => {
    const stepKey = `step${activeStep + 1}`; // step1, step2, step3, step4
    const isStepValid = await validateCurrentStep(stepKey);

    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    } else {
      enqueueSnackbar(
        "Please complete and validate the form before proceeding.",
        snackOptions
      );
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%", pt: 2 }}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={step.label} {...stepProps}>
              <StepLabel {...labelProps}>{step.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Step4 />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ mt: 2, mb: 1 }}>
            {React.createElement(steps[activeStep].component)}
          </Box>
          <FormActionButtons
            handleBack={handleBack}
            handleNext={handleNextStep}
            handleSkip={handleSkip}
            activeStep={activeStep}
            isStepOptional={isStepOptional}
            isLastStep={isLastStep}
          />
        </React.Fragment>
      )}
    </Box>
  );
};

export default StepperOrchestration;

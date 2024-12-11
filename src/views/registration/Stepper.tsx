import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { setIn, useFormikContext } from "formik";
import { enqueueSnackbar } from "notistack";
import * as React from "react";
import { Navigate } from "react-router-dom";
import { useStudentMutation } from "../../hooks/useStudentMutation";
import FormActionButtons from "./components/FormActionButtons";
import useValidateCurrentStep from "./hooks/useValidateCurrentStep";
import { snackOptions } from "./utilities/snackOptions";
import { steps } from "./utilities/steps";
import { transformFormikToApi } from "./utilities/transformData";
import { RegistrationFormUIValues } from "./utilities/validationSchema";
import config from "../../config";

interface StepperOrchestrationProps {}

// This code is lifted from the MUI Stepper example
// https://mui.com/material-ui/react-stepper/#linear
const StepperOrchestration: React.FC<StepperOrchestrationProps> = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const validateCurrentStep = useValidateCurrentStep();
  const { values, setTouched } = useFormikContext<RegistrationFormUIValues>();
  const submitStep = useStudentMutation();

  const isStepOptional = (step: number) => {
    // return step === 1;
    return false;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
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
    const stepKey = `step${activeStep + 1}` as keyof RegistrationFormUIValues; // step1, step2, step3, etc.

    // Create touched object for all fields in the step
    const touchedFields = Object.keys(values[stepKey]).reduce(
      (acc, field) => setIn(acc, `${stepKey}.${field}`, true),
      {}
    );

    // Set all fields in the current step as touched
    setTouched(touchedFields, true);

    // Validate the step after marking fields as touched
    const isStepValid = await validateCurrentStep(stepKey);

    if (isStepValid) {
      const apiData = transformFormikToApi({
        [stepKey]: values[stepKey],
      } as Partial<RegistrationFormUIValues>);
      // Submit the step if it is valid
      submitStep.mutate(apiData, {
        // Go to next step if successful
        onSuccess: () => setActiveStep((prev) => prev + 1),
      });
    } else {
      // step was not valid
      enqueueSnackbar(
        "Please complete and validate the form before proceeding.",
        snackOptions("error")
      );
    }
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%", pt: 2 }}>
      <Toolbar />
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
        (window.location.href = `${config.angularClientUrl}/eldt-handoff`)
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

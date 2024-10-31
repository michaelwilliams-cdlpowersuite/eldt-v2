import { Box, Button } from "@mui/material";
import { useFormikContext } from "formik";

interface FormActionButtonsProps {
  handleBack: () => void;
  handleNext: () => void;
  handleSkip: () => void;
  activeStep: number;
  isStepOptional: (step: number) => boolean;
  isLastStep: boolean;
}

const FormActionButtons: React.FC<FormActionButtonsProps> = ({
  handleBack,
  handleNext,
  handleSkip,
  activeStep,
  isStepOptional,
  isLastStep,
}) => {
  const { submitForm, values } = useFormikContext();

  const handleSubmit = () => {
    console.log(values);
    handleNext();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
      <Button
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      {isStepOptional(activeStep) && (
        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
          Skip
        </Button>
      )}
      <Button
        onClick={handleSubmit}
        // disabled={isLastStep ? !isValid || !dirty : false}
      >
        {isLastStep ? "Finish" : "Next"}
      </Button>
    </Box>
  );
};

export default FormActionButtons;

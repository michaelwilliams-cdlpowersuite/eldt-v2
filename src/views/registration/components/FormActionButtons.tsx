import { Box, Button } from "@mui/material";
import { useFormikContext } from "formik";
import { brandColors } from "../../../styles/brandColors";

interface FormActionButtonsProps {
  handleBack: () => void;
  handleNext: () => void;
  handleSkip: () => void;
  activeStep: number;
  isStepOptional: (step: number) => boolean;
  isLastStep: boolean;
  isLoading: boolean;
}

const FormActionButtons: React.FC<FormActionButtonsProps> = ({
  handleBack,
  handleNext,
  handleSkip,
  activeStep,
  isStepOptional,
  isLastStep,
  isLoading,
}) => {
  const { submitForm, values } = useFormikContext();

  const handleSubmit = () => {
    handleNext();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mb: 6, mx: 2 }}>
      <Button
        size="large"
        variant="outlined"
        disableElevation
        color="inherit"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 1 }}
      >
        Back
      </Button>
      <Box sx={{ flex: "1 1 auto" }} />
      {isStepOptional(activeStep) && (
        <Button
          sx={{
            mr: 1,
            backgroundColor: brandColors.goGreen,
            color: "#fff",
            "&:hover": { backgroundColor: "#e68900" },
          }}
          onClick={handleSkip}
        >
          Skip
        </Button>
      )}
      <Button
        size="large"
        onClick={handleSubmit}
        variant="contained"
        disableElevation
        disabled={isLoading}
        sx={{
          mr: 1,
          backgroundColor: brandColors.goGreen,
          color: "#fff",
          "&:hover": { backgroundColor: brandColors.goGreenHover },
        }}
      >
        {isLoading ? "Saving..." : (isLastStep ? "Done" : "Next")}
      </Button>
    </Box>
  );
};

export default FormActionButtons;

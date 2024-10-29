import { Box, Container } from "@mui/system";
import HorizontalLinearStepper from "./HorizontalLinearStepper";

interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ height: "100vh" }}>
        <HorizontalLinearStepper />
      </Box>
    </Container>
  );
};

export default Registration;

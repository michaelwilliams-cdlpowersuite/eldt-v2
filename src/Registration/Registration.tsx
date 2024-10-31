import { Box, Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Form, Formik } from "formik";
import { initialValues, validationSchema } from "./enums/validationSchema";
import Stepper from "./Stepper";
import RegistrationAppBar from "./components/AppBar";

interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RegistrationAppBar />
      <Container maxWidth="md" disableGutters sx={{ pt: 1 }}>
        <Box sx={{ height: "calc(100vh - 64px)" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
          >
            <Form>
              <Stepper />
            </Form>
          </Formik>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default Registration;

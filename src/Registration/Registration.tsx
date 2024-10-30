import { Box, Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Form, Formik } from "formik";
import { initialValues, validationSchema } from "./enums/validationSchema";
import Stepper from "./Stepper";

interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" disableGutters sx={{ bgcolor: "yellow" }}>
        <Box sx={{ height: "100vh" }}>
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

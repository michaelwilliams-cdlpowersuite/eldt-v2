import { Box, Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Form, Formik } from "formik";
import { Outlet } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import RegistrationAppBar from "./components/AppBar";
import {
  buildInitialValues,
  validationSchema,
} from "./utilities/validationSchema";

interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
  const { data: me } = useMe();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <RegistrationAppBar />
      <Container disableGutters sx={{ pt: 1 }}>
        <Box>
          <Formik
            initialValues={buildInitialValues(me)}
            validationSchema={validationSchema}
          >
            <Form>
              <Outlet />
            </Form>
          </Formik>
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default Registration;

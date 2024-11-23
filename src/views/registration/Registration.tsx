import { Box, Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Form, Formik } from "formik";
import { buildInitialValues, validationSchema } from "./utilities/validationSchema";
import RegistrationAppBar from "./components/AppBar";
import { Outlet } from "react-router-dom";
import {Button} from "@mui/material";
import {prepareHandoff} from "../../api/api";
import {useMe} from "../../hooks/useMe";

interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
  const handleAuthRedirect = async () => {
    await prepareHandoff()

    // @ts-ignore
    window.location = 'https://dev.eldt.com/eldt-handoff';
  };

  const { data: me } = useMe();

  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RegistrationAppBar />
        <Container disableGutters sx={{ pt: 1 }}>
          <Box>
            <Formik
              initialValues={buildInitialValues(me)}
              validationSchema={validationSchema}
              onSubmit={(values) => console.log(values)}
            >
              <Form>
                <Outlet />
              </Form>
            </Formik>
            <Button variant="contained" onClick={handleAuthRedirect}>Click me</Button>
          </Box>
        </Container>
      </LocalizationProvider>
  );
};

export default Registration;

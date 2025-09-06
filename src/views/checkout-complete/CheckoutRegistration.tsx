import { Box, Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Form, Formik } from "formik";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import RegistrationAppBar from "../registration/components/AppBar";
import CheckoutRegistrationStepper from "./CheckoutRegistrationStepper";
import {
    checkoutValidationSchema,
    buildCheckoutInitialValues
} from "./utilities/checkoutValidationSchema";

const CheckoutRegistration = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const checkoutSessionId = searchParams.get("checkout_session_id");

    useEffect(() => {
        if (!checkoutSessionId) {
            navigate("/");
            return;
        }
    }, [checkoutSessionId, navigate]);

    const initialValues = buildCheckoutInitialValues();

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RegistrationAppBar />
            <Container disableGutters sx={{ pt: 1 }}>
                <Box>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={checkoutValidationSchema}
                        onSubmit={() => {
                            // This won't be used as we handle submission in the stepper
                        }}
                    >
                        <Form>
                            <CheckoutRegistrationStepper />
                        </Form>
                    </Formik>
                </Box>
            </Container>
        </LocalizationProvider>
    );
};

export default CheckoutRegistration;

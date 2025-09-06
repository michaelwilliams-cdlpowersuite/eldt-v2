import { Formik } from "formik";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
        <Formik
            initialValues={initialValues}
            validationSchema={checkoutValidationSchema}
            onSubmit={() => {
                // This won't be used as we handle submission in the stepper
            }}
        >
            <CheckoutRegistrationStepper />
        </Formik>
    );
};

export default CheckoutRegistration;

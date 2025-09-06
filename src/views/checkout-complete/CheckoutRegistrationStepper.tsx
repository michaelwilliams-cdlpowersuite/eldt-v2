import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { setIn, useFormikContext } from "formik";
import { enqueueSnackbar, SnackbarContent } from "notistack";
import * as React from "react";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormActionButtons from "../registration/components/FormActionButtons";
import useValidateCurrentStep from "../registration/hooks/useValidateCurrentStep";
import { snackOptions } from "../registration/utilities/snackOptions";
import { checkoutSteps } from "./components/CheckoutSteps";
import { transformCheckoutFormikToApi } from "./utilities/transformCheckoutData";
import { CheckoutRegistrationFormValues } from "./utilities/checkoutValidationSchema";
import FullpageLoader from "../../components/FullpageLoader";
import config from "../../config";
import { prepareHandoff } from "../../api/api";
import { useCheckoutRegistration } from "./hooks/useCheckoutRegistration";

interface CheckoutStepperProps { }

const CheckoutRegistrationStepper: React.FC<CheckoutStepperProps> = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());
    const validateCurrentStep = useValidateCurrentStep();
    const { values, setTouched } = useFormikContext<CheckoutRegistrationFormValues>();
    const { mutate: submitStep, isPending: isSubmitting } = useCheckoutRegistration();

    const checkoutSessionId = searchParams.get("checkoutSessionId");

    useEffect(() => {
        if (!checkoutSessionId) {
            navigate("/");
            return;
        }
    }, [checkoutSessionId, navigate]);

    const isStepOptional = (step: number) => {
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
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const isLastStep = activeStep === checkoutSteps.length - 1;

    const handleAuthRedirect = async () => {
        await prepareHandoff();
        localStorage.removeItem('apiToken');
        window.location.replace(config.angularClientUrl + '/eldt-handoff');
    };

    const handleNextStep = async () => {
        const stepKey = `step${activeStep + 2}` as keyof CheckoutRegistrationFormValues; // step2, step3 (since we start with step 2)

        // Create touched object for all fields in the step
        const touchedFields = Object.keys(values[stepKey]).reduce(
            (acc, field) => setIn(acc, `${stepKey}.${field}`, true),
            {}
        );

        // Set all fields in the current step as touched
        setTouched(touchedFields, true);

        // Validate the step after marking fields as touched
        const isStepValid = await validateCurrentStep(stepKey);

        if (isStepValid && checkoutSessionId) {
            const apiData = transformCheckoutFormikToApi(
                {
                    [stepKey]: values[stepKey],
                } as Partial<CheckoutRegistrationFormValues>,
                isLastStep // isComplete = true on last step
            );

            // Submit the step if it is valid
            submitStep(
                { checkoutSessionId, data: apiData },
                {
                    // Go to next step if successful, or complete the flow
                    onSuccess: () => {
                        if (isLastStep) {
                            // Complete the registration flow and redirect to ELDT
                            setActiveStep((prev) => prev + 1);
                        } else {
                            setActiveStep((prev) => prev + 1);
                        }
                    },
                    onError: () => {
                        // Error handling is now done in the hook
                    }
                }
            );
        } else {
            // step was not valid
            enqueueSnackbar(
                <SnackbarContent>Oops, you missed a field. Please check your inputs.</SnackbarContent>,
                snackOptions("error")
            );
        }
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [activeStep]);

    const containerRef = React.useRef<HTMLDivElement | null>(null);

    return (
        <Box ref={containerRef} sx={{ width: "100%", pt: 2, minHeight: "100vh" }}>
            <Toolbar />
            <Stepper activeStep={activeStep}>
                {checkoutSteps.map((step, index) => {
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
            {activeStep === checkoutSteps.length ? (
                <FullpageLoader onComplete={handleAuthRedirect} />
            ) : (
                <React.Fragment>
                    <Box sx={{ mt: 2, mb: 1 }}>
                        {React.createElement(checkoutSteps[activeStep].component)}
                    </Box>
                    <FormActionButtons
                        handleBack={handleBack}
                        handleNext={handleNextStep}
                        handleSkip={handleSkip}
                        activeStep={activeStep}
                        isStepOptional={isStepOptional}
                        isLastStep={isLastStep}
                        isLoading={isSubmitting}
                    />
                </React.Fragment>
            )}
        </Box>
    );
};

export default CheckoutRegistrationStepper;

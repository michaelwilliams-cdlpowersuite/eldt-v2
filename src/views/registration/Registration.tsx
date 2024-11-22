import { Box, Container } from "@mui/system";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Form, Formik } from "formik";
import { initialValues, validationSchema } from "./utilities/validationSchema";
import Stepper from "./Stepper";
import RegistrationAppBar from "./components/AppBar";
import { Elements } from "@stripe/react-stripe-js";
import { useAmount } from "./context/AmountContext";
import { loadStripe } from "@stripe/stripe-js";
import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import {Button} from "@mui/material";
import {prepareHandoff} from "../../api/api";

const stripePromise = loadStripe(
  "pk_test_51KVilWEqooDHZwmck4VuUymwm3Bw75Fuyryrd0o3MiIlhowWiYpgJg0RgyrNIKufGU4lwTGYZxoIcsSSgP2ZaDmJ00Lb7M2O9G" // TODO: Move to .env
);

interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
  const { amount } = useAmount();

  // Options were taken from stripe-payment.component.ts in the original project
  const options = useMemo(
    () => ({
      mode: "payment" as "payment",
      amount: amount * 100,
      currency: "usd",
      paymentMethodCreation: "manual" as "manual",
      paymentMethodTypes: ["card"],
      appearance: {
        theme: "stripe" as "stripe",
        variables: {
          iconColor: "#0C567D",
        },
      },
    }),
    [amount]
  );

  const handleAuthRedirect = async () => {
    await prepareHandoff()

    // @ts-ignore
    window.location = (process.env.ANGULAR_CLIENT_URL || "http://localhost:4200") + '/eldt-handoff';
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RegistrationAppBar />
        <Container disableGutters sx={{ pt: 1 }}>
          <Box>
            <Formik
              initialValues={initialValues}
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
    </Elements>
  );
};

export default Registration;

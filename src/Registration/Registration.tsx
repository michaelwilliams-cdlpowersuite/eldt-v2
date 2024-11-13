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

const stripePromise = loadStripe(
  "pk_test_51KVilWEqooDHZwmck4VuUymwm3Bw75Fuyryrd0o3MiIlhowWiYpgJg0RgyrNIKufGU4lwTGYZxoIcsSSgP2ZaDmJ00Lb7M2O9G"
);

interface RegistrationProps {}

const Registration: React.FC<RegistrationProps> = () => {
  const { amount } = useAmount();

  // These were taken from stripe-payment.component.ts in the original project
  const options = {
    mode: "payment" as "payment",
    amount: amount,
    currency: "usd",
    paymentMethodCreation: "manual" as "manual",
    paymentMethodTypes: ["card"],
    appearance: {
      theme: "stripe" as "stripe",
      variables: {
        iconColor: "#0C567D",
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
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
    </Elements>
  );
};

export default Registration;

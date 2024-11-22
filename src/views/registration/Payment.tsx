import { Container, Grid2, Toolbar } from "@mui/material";
import { pxContainer } from "./utilities/styles";
import CheckoutForm from "./components/CheckoutForm";

interface PaymentProps {}

const Payment: React.FC<PaymentProps> = () => {
  return (
    <>
      <Container sx={{ px: pxContainer }}>
        <Toolbar />
        <Grid2 container spacing={2} sx={{ mt: 2 }}>
          <Grid2 size={12}>
            <CheckoutForm />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
};

export default Payment;

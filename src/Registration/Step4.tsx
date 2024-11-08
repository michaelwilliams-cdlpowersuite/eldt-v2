import { Typography } from "@mui/material";
import PaymentForm from "./components/PaymentForm";

interface Step4Props {}

const Step4: React.FC<Step4Props> = () => {
  return (
    <>
      <Typography sx={{ mt: 2, mb: 1 }}>Put final screen here.</Typography>
      <PaymentForm />
    </>
  );
};

export default Step4;

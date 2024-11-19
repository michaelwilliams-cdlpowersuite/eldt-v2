import { PaymentElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  return (
    <>
      <PaymentElement />
      <button>Submit</button>
    </>
  );
};

export default CheckoutForm;

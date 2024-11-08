import { loadStripe, Appearance } from "@stripe/stripe-js";

// Load Stripe with your public key
export const stripePromise = loadStripe("your-publishable-key-here");

// Define your custom appearance options
const appearance: Appearance = {
  theme: "flat", // Ensure the value is one of the allowed types: 'stripe' | 'flat' | 'night' | undefined
  variables: {
    colorPrimary: "#00C058",
    colorBackground: "#ffffff",
    colorText: "#333333",
    borderRadius: "4px",
  },
};

export const options = {
  clientSecret: "your-client-secret",
  appearance,
};

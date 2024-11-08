import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import Registration from "./Registration/Registration";
import { theme } from "./styles/theme";
import { loadStripe } from "@stripe/stripe-js";

// Load Stripe with your public key
const stripePromise = loadStripe("your-publishable-key-here");

const App = () => {
  const queryClient = new QueryClient();

  // Verify Google auth token
  const verifyToken = async (token: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
      );
      const userInfo = await response.json();
      console.log("User info:", userInfo);
    } catch (error) {
      console.error("Token verification failed:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("google_auth_token");
    if (token) verifyToken(token);
  }, []);

  return (
    <div className="App">
      <Elements stripe={stripePromise}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider>
            <QueryClientProvider client={queryClient}>
              <Registration />
            </QueryClientProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </Elements>
    </div>
  );
};

export default App;

import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { AmountProvider } from "./Registration/context/AmountContext";
import mainRoutes from "./routes/MainRoutes";
import { theme } from "./styles/theme";

const App = () => {
  const queryClient = new QueryClient();

  // Verify Google auth token //TODO: Move this to a hook or use a library
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
    const token = localStorage.getItem("apiToken");
    if (token) verifyToken(token);
  }, []);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <AmountProvider>
              <RouterProvider router={mainRoutes} />
            </AmountProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;

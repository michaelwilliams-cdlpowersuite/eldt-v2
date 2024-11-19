import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { AmountProvider } from "./Registration/context/AmountContext";
import { theme } from "./styles/theme";
import RouterWrapper from "./routes/RouterWrapper";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <AmountProvider>
              <RouterWrapper />
            </AmountProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;

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

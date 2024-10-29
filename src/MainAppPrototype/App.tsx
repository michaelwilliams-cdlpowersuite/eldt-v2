import { RouterProvider } from "react-router-dom";
import mainRoutes from "./routes/MainRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles/theme";
import { CssBaseline } from "@mui/material";

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={mainRoutes} />
          </QueryClientProvider>
        </SnackbarProvider>
      </div>
    </ThemeProvider>
  );
}

export default App;

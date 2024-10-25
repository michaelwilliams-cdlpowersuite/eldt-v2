import { RouterProvider } from "react-router-dom";
import mainRoutes from "./routes/MainRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles/theme";

function App() {
  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
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

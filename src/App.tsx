import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";
import Registration from "./Registration/Registration";
import { theme } from "./styles/theme";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <Registration />
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;

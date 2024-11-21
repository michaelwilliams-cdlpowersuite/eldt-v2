import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import RouterWrapper from "./routes/RouterWrapper";
import { theme } from "./styles/theme";
import { AmountProvider } from "./views/registration/context/AmountContext";
import * as amplitude from "@amplitude/analytics-browser";

const amplitudeApiKey = process.env.REACT_APP_AMPLITUDE_API_KEY;
if (amplitudeApiKey) {
  amplitude.init(amplitudeApiKey);
} else {
  console.error("Amplitude API key is not defined");
}

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <SnackbarProvider>
            <AmountProvider>
              <RouterWrapper />
            </AmountProvider>
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;

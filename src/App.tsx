import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SnackbarProvider } from "notistack";
import RouterWrapper from "./routes/RouterWrapper";
import { theme } from "./styles/theme";
import * as amplitude from "@amplitude/analytics-browser";
import config from "./config";
import { AuthProvider } from "./auth/AuthProvider";
import * as Sentry from "@sentry/react";

const amplitudeApiKey = config.amplitudeApiKey;
if (amplitudeApiKey) {
  amplitude.init(amplitudeApiKey);
}

const App = () => {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="top-left"
            />
            <SnackbarProvider>
              <RouterWrapper />
            </SnackbarProvider>
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;

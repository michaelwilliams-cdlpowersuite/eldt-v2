import { RouterProvider } from "react-router-dom";
import mainRoutes from "./routes/MainRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <SnackbarProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={mainRoutes} />
        </QueryClientProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;

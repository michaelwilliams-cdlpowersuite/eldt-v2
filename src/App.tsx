import { RouterProvider } from "react-router-dom";
import mainRoutes from "./routes/MainRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={mainRoutes} />
      </QueryClientProvider>
    </div>
  );
}

export default App;

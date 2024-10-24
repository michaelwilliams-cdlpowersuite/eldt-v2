import { RouterProvider } from "react-router-dom";
import mainRoutes from "./routes/MainRoutes";

function App() {
  return (
    <div className="App">
      <RouterProvider router={mainRoutes} />
    </div>
  );
}

export default App;

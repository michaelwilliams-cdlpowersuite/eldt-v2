import { createBrowserRouter } from "react-router-dom";
import Layout2 from "../layouts/MainLayout";
import DailyPlanner from "../pages/DailyPlanner";
import Schedule from "../pages/Schedule";
import Students from "../pages/Students/Students";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout2 />,
    children: [
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "schedule",
        element: <Schedule />,
      },
      {
        path: "daily-planner",
        element: <DailyPlanner />,
      },
    ],
  },
]);

export default mainRoutes;

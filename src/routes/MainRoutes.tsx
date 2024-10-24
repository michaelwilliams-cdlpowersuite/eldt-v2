import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DailyPlanner from "../pages/DailyPlanner";
import Students from "../pages/Students";
import Schedule from "../pages/Schedule";

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
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
  //   {path: '*', element: <NotFound />}
]);

export default mainRoutes;

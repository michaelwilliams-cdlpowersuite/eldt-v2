import { createBrowserRouter, Navigate } from "react-router-dom";
import DailyPlanner from "../MainAppPrototype/pages/DailyPlanner";
import Schedule from "../MainAppPrototype/pages/Schedule";
import Students from "../MainAppPrototype/pages/Students/Students";
import SignInSide from "../Templates/sign-in-side/SignInSide";
import SignUp from "../Templates/sign-up/SignUp";
import Registration from "../Registration/Registration";

const isAuthenticated = !!localStorage.getItem("apiToken");

const ProtectedRoute = ({
  isAuthenticated,
  children,
}: {
  isAuthenticated: boolean;
  children: JSX.Element;
}) => {
  return isAuthenticated ? children : <Navigate to="/sign-in" />;
};

const mainRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute isAuthenticated={isAuthenticated}>
        <Registration />
      </ProtectedRoute>
    ),
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
  {
    path: "/sign-in",
    element: <SignInSide disableCustomTheme />,
  },
  {
    path: "/sign-up",
    element: <SignUp disableCustomTheme />,
  },
]);

export default mainRoutes;

import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useMe } from "../hooks/useMe";
import SignInSide from "../views/sign-in-side/SignInSide";
import SignUp from "../views/sign-up/SignUp";
import Registration from "../views/registration/Registration";
import VerifyEmail from "../views/verify-email/VerifyEmail";
import { ProtectedRoute } from "./ProtectedRoute";
import { useAuth } from "../hooks/useAuth";

const RouterWrapper = () => {
  const { isAuthenticated } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const { data: me, isLoading: isMeLoading } = useMe();

  useEffect(() => {
    setIsEmailVerified(!!me?.emailVerifiedAt);
  }, [me]);

  const fallback = <div>Loading...</div>;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/register" replace />,
    },
    {
      path: "/register",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          isEmailVerified={isEmailVerified}
          fallback={isMeLoading ? fallback : undefined}
        >
          <Registration />
        </ProtectedRoute>
      ),
    },
    {
      path: "/sign-in",
      element: <SignInSide disableCustomTheme />,
    },
    {
      path: "/sign-up",
      element: <SignUp disableCustomTheme />,
    },
    {
      path: "/verify-email",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          isEmailVerified={isEmailVerified}
        >
          <VerifyEmail disableCustomTheme />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterWrapper;

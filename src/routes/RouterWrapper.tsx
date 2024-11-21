import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import SignInSide from "../views/mui-templates/sign-in-side/SignInSide";
import SignUp from "../views/mui-templates/sign-up/SignUp";
import Registration from "../views/registration/Registration";
import VerifyEmail from "../views/verify-email/VerifyEmail";
import { ProtectedRoute } from "./ProtectedRoute";

const RouterWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("apiToken")
  );

  const { data: me, isLoading } = useMe();

  const isEmailVerified = !!me?.emailVerifiedAt;

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem("apiToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const fallback = <div>Loading...</div>;

  if (isLoading) {
    return fallback;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          emailVerified={isEmailVerified}
          fallback={isLoading ? fallback : undefined}
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
          emailVerified={isEmailVerified}
          fallback={isLoading ? fallback : undefined}
        >
          <VerifyEmail disableCustomTheme />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterWrapper;

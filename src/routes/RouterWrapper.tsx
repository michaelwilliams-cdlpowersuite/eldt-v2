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

  const { data: me, isLoading: isMeLoading } = useMe();

  const isEmailVerified = !!me?.emailVerifiedAt;

  const handleStorageChange = () => {
    setIsAuthenticated(!!localStorage.getItem("apiToken"));
  };
  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Trigger state update directly on token change within the same tab
  useEffect(() => {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key: string, value: string) {
      originalSetItem.apply(this, [key, value] as [string, string]);
      if (key === "apiToken") {
        handleStorageChange();
      }
    };

    return () => {
      localStorage.setItem = originalSetItem;
    };
  }, []);

  // Define routes

  const fallback = <div>Loading...</div>;

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          emailVerified={isEmailVerified}
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
          emailVerified={isEmailVerified}
          fallback={isMeLoading ? fallback : undefined}
        >
          <VerifyEmail disableCustomTheme />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterWrapper;

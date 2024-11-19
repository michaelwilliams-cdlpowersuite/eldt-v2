import React, { useEffect, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Registration from "../views/registration/Registration";
import SignInSide from "../views/mui-templates/sign-in-side/SignInSide";
import SignUp from "../views/mui-templates/sign-up/SignUp";
import { useMe } from "../hooks/useMe";
import VerifyEmail from "../views/verify-email/VerifyEmail";

const ProtectedRoute = ({
  isAuthenticated,
  emailVerified,
  children,
}: {
  isAuthenticated: boolean;
  emailVerified?: boolean;
  children: JSX.Element;
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }
  if (emailVerified === false) {
    return <Navigate to="/verify-email" />;
  }
  return children;
};

const RouterWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("apiToken")
  );

  const { data: me, isLoading, error } = useMe();

  const isEmailVerified = !!me?.emailVerifiedAt;

  console.log("verified at", me?.emailVerifiedAt);

  // Manually update `isAuthenticated` on login/logout
  const updateAuthState = () => {
    setIsAuthenticated(!!localStorage.getItem("apiToken"));
  };

  // Listen for manual changes in localStorage
  useEffect(() => {
    // Event listener for other tabs/windows
    const handleStorageChange = () => {
      updateAuthState();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Trigger state update directly on token change within the same tab
  useEffect(() => {
    const originalSetItem = localStorage.setItem;

    localStorage.setItem = function (key: string, value: string) {
      // Explicitly cast arguments to the required tuple type
      originalSetItem.apply(this, [key, value] as [string, string]); // Cast to [string, string]
      if (key === "apiToken") {
        updateAuthState(); // Update state when apiToken changes
      }
    };

    return () => {
      // Restore the original method
      localStorage.setItem = originalSetItem;
    };
  }, []);

  // Define routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute
          isAuthenticated={isAuthenticated}
          emailVerified={isEmailVerified}
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
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <VerifyEmail disableCustomTheme />
        </ProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default RouterWrapper;

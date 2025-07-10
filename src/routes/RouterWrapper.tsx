// src/router/RouterWrapper.tsx
import { useMemo } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import * as Sentry from "@sentry/react";

import { useAuth } from "../auth/AuthProvider";
import { useMe } from "../hooks/useMe";
import RootRedirect from "./RootRedirect";
import { ProtectedRoute } from "./ProtectedRoute";

import FullpageLoader from "../components/FullpageLoader";
import { prepareHandoff } from "../api/api";
import config from "../config";

// Views
import Registration from "../views/registration/Registration";
import StepperOrchestration from "../views/registration/Stepper";
import Checkout from "../views/registration/Checkout";
import CheckoutFlow from "../views/checkout/index";
import SignInSide from "../views/sign-in-side/SignInSide";
import SignUpSide from "../views/sign-up/SignUpSide";
import CheckEmailToVerify from "../views/verify-email/CheckEmailToVerify";
import VerifyEmail from "../views/verify-email/VerifyEmail";
import OAuthHandoff from "../views/Auth/OAuthHandoff";

export default function RouterWrapper() {
  const { isAuthenticated } = useAuth();
  const { data: me, isLoading: isMeLoading } = useMe();

  const handleAuthRedirect = async () => {
    await prepareHandoff();
    localStorage.removeItem("apiToken");
    window.location.replace(config.angularClientUrl + "/eldt-handoff");
  };

  const sentryCreateBrowserRouter = Sentry.wrapCreateBrowserRouter(createBrowserRouter);

  // Memoize the router instance
  const router = useMemo(() => {
    return sentryCreateBrowserRouter([
      {
        path: "/",
        element: <RootRedirect />,
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute
            isEmailVerified={!!me?.emailVerifiedAt}
            isLoading={isMeLoading}
          >
            <Registration />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <StepperOrchestration />,
          },
        ],
      },
      {
        path: "/completed",
        element: <FullpageLoader onComplete={handleAuthRedirect} />,
      },
      {
        path: "/sign-in",
        element: isAuthenticated ? (
          <Navigate to="/register" replace />
        ) : (
          <SignInSide disableCustomTheme />
        ),
      },
      {
        path: "/sign-up",
        element: isAuthenticated ? (
          <Navigate to="/register" replace />
        ) : (
          <SignUpSide disableCustomTheme />
        ),
      },
      {
        path: "/check-email",
        element: (
          <ProtectedRoute
            isEmailVerified={!!me?.emailVerifiedAt}
            isLoading={isMeLoading}
          >
            <CheckEmailToVerify disableCustomTheme />
          </ProtectedRoute>
        ),
      },
      {
        path: "/email-verification",
        element: <VerifyEmail />,
      },
      {
        path: "/oauth-handoff",
        element: <OAuthHandoff />,
      },
      {
        path: "/checkout",
        element: <CheckoutFlow />,
      },
    ]);
  }, [isAuthenticated, me?.emailVerifiedAt, isMeLoading, sentryCreateBrowserRouter]);

  return <RouterProvider router={router} />;
}

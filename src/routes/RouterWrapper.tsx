import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import * as Sentry from "@sentry/react";

import { useMe } from "../hooks/useMe";
import { useAuth } from "../auth/AuthProvider";
import Checkout from "../views/registration/Checkout";
import Payment from "../views/registration/Payment";
import Registration from "../views/registration/Registration";
import StepperOrchestration from "../views/registration/Stepper";
import SignInSide from "../views/sign-in-side/SignInSide";
import SignUpSide from "../views/sign-up/SignUpSide";
import CheckEmailToVerify from "../views/verify-email/CheckEmailToVerify";
import VerifyEmail from "../views/verify-email/VerifyEmail";
import OAuthHandoff from "../views/Auth/OAuthHandoff";
import { ProtectedRoute } from "./ProtectedRoute";
import FullpageLoader from "../components/FullpageLoader";
import { prepareHandoff } from "../api/api";
import config from "../config";

const RouterWrapper = () => {
  const { isAuthenticated } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const { data: me, isLoading: isMeLoading } = useMe();

  useEffect(() => {
    setIsEmailVerified(!!me?.emailVerifiedAt);
  }, [me]);

  const handleAuthRedirect = async () => {
    await prepareHandoff();
    localStorage.removeItem("apiToken");
    window.location.replace(config.angularClientUrl + "/eldt-handoff");
  };

  const sentryCreateBrowserRouter =
      Sentry.wrapCreateBrowserRouter(createBrowserRouter);

  const router = sentryCreateBrowserRouter([
    {
      path: "/",
      element: (() => {
        if (!isAuthenticated) {
          return <Navigate to="/sign-up" replace />;
        }
        if (me?.student?.applicationCompletedAt != null) {
          return <Navigate to="/completed" replace />;
        }
        return <Navigate to="/register" replace />;
      })(),
    },
    {
      path: "/register",
      element: (
          <ProtectedRoute isEmailVerified={isEmailVerified} isLoading={isMeLoading}>
            <Registration />
          </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <StepperOrchestration />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "payment",
          element: <Payment />,
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
          // If logged in, redirect to registration steps
          <Navigate to="/register" replace />
      ) : (
          <SignInSide disableCustomTheme />
      ),
    },
    {
      path: "/sign-up",
      element: isAuthenticated ? (
          // If logged in, redirect to registration steps
          <Navigate to="/register" replace />
      ) : (
          <SignUpSide disableCustomTheme />
      ),
    },
    {
      path: "/check-email",
      element: (
          <ProtectedRoute isEmailVerified={isEmailVerified}>
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
  ]);

  return <RouterProvider router={router} />;
};

export default RouterWrapper;

import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useMe } from "../hooks/useMe";
import Checkout from "../views/registration/Checkout";
import Payment from "../views/registration/Payment";
import Registration from "../views/registration/Registration";
import StepperOrchestration from "../views/registration/Stepper";
import SignInSide from "../views/sign-in-side/SignInSide";
import SignUpSide from "../views/sign-up/SignUpSide";
import CheckEmailToVerify from "../views/verify-email/CheckEmailToVerify";
import { ProtectedRoute } from "./ProtectedRoute";
import VerifyEmail from "../views/verify-email/VerifyEmail";
import { useAuth } from "../auth/AuthProvider";
import OAuthHandoff from "../views/Auth/OAuthHandoff";
import * as Sentry from "@sentry/react";
import {prepareHandoff} from "../api/api";
import config from "../config";
import FullpageLoader from "../components/FullpageLoader";

const RouterWrapper = () => {
  const { isAuthenticated } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const { data: me, isLoading: isMeLoading } = useMe();

  useEffect(() => {
    setIsEmailVerified(!!me?.emailVerifiedAt);
  }, [me]);

  const handleAuthRedirect = async () => {
    await prepareHandoff()
    localStorage.removeItem('apiToken');
    window.location.replace(config.angularClientUrl+'/eldt-handoff');
  };

  const sentryCreateBrowserRouter =
    Sentry.wrapCreateBrowserRouter(createBrowserRouter);

  const router = sentryCreateBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? (
          me?.student?.applicationCompletedAt !== null &&
          config.forceCompletedApplicationRedirect ? (
              // Redirect to a specific page if the application is completed
              <Navigate to="/completed" replace />
          ) : (
              <Navigate to="/register" replace />
          )
      ) : (
          <Navigate to="/sign-up" replace />
      ),
    },
    {
      path: "/register",
      element: (
        <ProtectedRoute
          isEmailVerified={isEmailVerified}
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
      element: <SignInSide disableCustomTheme />,
    },
    {
      path: "/sign-up",
      element: <SignUpSide disableCustomTheme />,
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

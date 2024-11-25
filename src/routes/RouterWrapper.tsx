import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
import { ProtectedRoute } from "./ProtectedRoute";
import { refreshToken } from "../api/api";

const RouterWrapper = () => {
  const { isAuthenticated } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const { data: me, isLoading: isMeLoading } = useMe();

  useEffect(() => {
    setIsEmailVerified(!!me?.emailVerifiedAt);
  }, [me]);

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: isAuthenticated ? <Navigate to="/register" replace /> : <Navigate to="/sign-up" replace />,
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
        element: (
          <VerifyEmail />
        ),
      },
    ]
  );

  return <RouterProvider router={router} />;
};

export default RouterWrapper;

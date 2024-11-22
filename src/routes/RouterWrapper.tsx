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
import VerifyEmail from "../views/verify-email/VerifyEmail";
import { ProtectedRoute } from "./ProtectedRoute";

const RouterWrapper = () => {
  const { isAuthenticated } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  console.log("isAuthenticated", isAuthenticated);
  const { data: me, isLoading: isMeLoading } = useMe();

  useEffect(() => {
    setIsEmailVerified(!!me?.emailVerifiedAt);
  }, [me]);

  const fallback = <div>Loading...</div>;

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Navigate to="/register" replace />,
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute
            isEmailVerified={isEmailVerified}
            fallback={isMeLoading ? fallback : undefined}
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
        path: "/verify-email",
        element: (
          <ProtectedRoute isEmailVerified={isEmailVerified}>
            <VerifyEmail disableCustomTheme />
          </ProtectedRoute>
        ),
      },
    ],
    { basename: "/theory" }
  );

  return <RouterProvider router={router} />;
};

export default RouterWrapper;

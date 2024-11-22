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
import Checkout from "../views/registration/Checkout";
import Payment from "../views/registration/Payment";
import StepperOrchestration from "../views/registration/Stepper";

const RouterWrapper = () => {
  const { isAuthenticated } = useAuth();
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  console.log("isAuthenticated", isAuthenticated);
  const { data: me, isLoading: isMeLoading } = useMe();

  useEffect(() => {
    setIsEmailVerified(!!me?.emailVerifiedAt);
  }, [me]);

  const fallback = <div></div>;

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

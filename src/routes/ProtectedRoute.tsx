import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import FullpageLoader from "../components/FullpageLoader";

export const ProtectedRoute = ({
  isEmailVerified,
  fallback,
  isLoading,
  children,
}: {
  isEmailVerified?: boolean;
  fallback?: JSX.Element;
  isLoading?: boolean;
  children: JSX.Element;
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (
      isAuthenticated &&
      isEmailVerified &&
      window.location.pathname === "/check-email"
    ) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isEmailVerified, navigate]);

  if (isLoading) {
    return fallback || <FullpageLoader></FullpageLoader>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  // TODO: Figure out a better way to handle this
  //   if (
  //     isEmailVerified === false &&
  //     window.location.pathname !== "/verify-email"
  //   ) {
  //     return <Navigate to="/verify-email" />;
  //   }

  return children;
};

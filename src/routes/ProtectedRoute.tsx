import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({
  isAuthenticated,
  isEmailVerified,
  fallback,
  isLoading,
  children,
}: {
  isAuthenticated: boolean;
  isEmailVerified?: boolean;
  fallback?: JSX.Element;
  isLoading?: boolean;
  children: JSX.Element;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isAuthenticated &&
      isEmailVerified &&
      window.location.pathname === "/verify-email"
    ) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isEmailVerified, navigate]);

  if (isLoading) {
    return fallback || <div>Loading...</div>;
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

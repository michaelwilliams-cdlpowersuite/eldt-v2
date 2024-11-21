import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({
  isAuthenticated,
  isEmailVerified,
  fallback,
  children,
}: {
  isAuthenticated: boolean;
  isEmailVerified?: boolean;
  fallback?: JSX.Element;
  children: JSX.Element;
}) => {
  const navigate = useNavigate();

  console.log("isAuthenticated", isAuthenticated);
  console.log("isEmailVerified", isEmailVerified);
  useEffect(() => {
    if (
      isAuthenticated &&
      isEmailVerified &&
      window.location.pathname === "/verify-email"
    ) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isEmailVerified, navigate]);

  if (fallback && !isEmailVerified) {
    return fallback;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (
    isEmailVerified === false &&
    window.location.pathname !== "/verify-email"
  ) {
    return <Navigate to="/verify-email" />;
  }

  return children;
};

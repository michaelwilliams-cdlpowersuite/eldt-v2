import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const ProtectedRoute = ({
  isAuthenticated,
  emailVerified,
  fallback,
  children,
}: {
  isAuthenticated: boolean;
  emailVerified?: boolean;
  fallback?: JSX.Element;
  children: JSX.Element;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      isAuthenticated &&
      emailVerified &&
      window.location.pathname === "/verify-email"
    ) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, emailVerified, navigate]);

  if (fallback && emailVerified === undefined) {
    return fallback;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (emailVerified === false) {
    return <Navigate to="/verify-email" />;
  }

  return children;
};

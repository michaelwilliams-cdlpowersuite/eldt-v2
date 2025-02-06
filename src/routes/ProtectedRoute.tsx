import { Navigate, useLocation } from "react-router-dom";
import FullpageLoader from "../components/FullpageLoader";
import { useAuth } from "../auth/AuthProvider";

export function ProtectedRoute({
                                   children,
                                   isLoading,
                                   isEmailVerified,
                                   fallback,
                               }: {
    isLoading?: boolean;
    isEmailVerified?: boolean;
    fallback?: JSX.Element;
    children: JSX.Element;
}) {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return fallback || <FullpageLoader />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/sign-in" replace />;
    }

    if (
        !isEmailVerified &&
        location.pathname !== "/check-email" &&
        location.pathname !== "/email-verification"
    ) {
        return <Navigate to="/check-email" replace />;
    }

    return children;
}

// src/router/RootRedirect.tsx
import { Navigate } from "react-router-dom";
import FullpageLoader from "../components/FullpageLoader";
import { useAuth } from "../auth/AuthProvider";
import { useMe } from "../hooks/useMe";

export default function RootRedirect() {
    const { isAuthenticated } = useAuth();
    const { data: me, isLoading } = useMe();

    // 1. Still loading
    if (isLoading) {
        return <FullpageLoader />;
    }

    // 2. Not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/sign-up" replace />;
    }

    // 3. Authenticated but email is not verified
    if (!me?.emailVerifiedAt) {
        return <Navigate to="/check-email" replace />;
        // or "/email-verification" if that’s your preference
    }

    // 4. Authenticated + Verified, but user’s application is complete
    if (me?.student?.applicationCompletedAt) {
        return <Navigate to="/completed" replace />;
    }

    // 5. Otherwise, go to the registration flow
    return <Navigate to="/register" replace />;
}

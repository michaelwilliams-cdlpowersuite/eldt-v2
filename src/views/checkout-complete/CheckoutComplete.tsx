import { CssBaseline, Typography, Button } from "@mui/material";
import * as React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AppTheme from "../../styles/shared-theme/AppTheme";
import { useCheckoutSession } from "./hooks/useCheckoutSession";
import { useCheckoutEmailUpdate } from "./hooks/useCheckoutEmailUpdate";
import { useCheckoutEmailResend } from "./hooks/useCheckoutEmailResend";
import FullpageLoader from "../../components/FullpageLoader";
import EmailVerificationCard from "../../components/EmailVerificationCard";
import config from "../../config";
import { prepareHandoff } from "../../api/api";

interface CheckoutCompleteProps {
    disableCustomTheme?: boolean;
}

const CheckoutComplete: React.FC<CheckoutCompleteProps> = (props) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isRedirecting, setIsRedirecting] = React.useState(false);

    const checkoutSessionId = searchParams.get("checkoutSessionId");
    const { data: session, isLoading: loading, error } = useCheckoutSession(checkoutSessionId);
    const { mutate: updateEmail, isPending: isPendingUpdateEmail } = useCheckoutEmailUpdate();
    const { mutate: resendEmail, isPending: isPendingResendEmail } = useCheckoutEmailResend();

    React.useEffect(() => {
        if (!checkoutSessionId) {
            // Redirect to home if no checkout session ID
            navigate("/");
            return;
        }
    }, [checkoutSessionId, navigate]);

    const handleResendEmail = () => {
        if (checkoutSessionId) {
            resendEmail({ checkoutSessionId });
        }
    };

    const handleUpdateEmail = (newEmail: string) => {
        if (checkoutSessionId && newEmail) {
            updateEmail({
                checkoutSessionId,
                email: newEmail
            });
        }
    };

    const handleAuthRedirect = async () => {
        await prepareHandoff();
        localStorage.removeItem('apiToken');
        window.location.replace(config.angularClientUrl + '/eldt-handoff');
    };

    // Auto-redirect if email verification is not required
    React.useEffect(() => {
        if (session && !session.requiresEmailVerification && !isRedirecting) {
            setIsRedirecting(true);

            if (session.requiresRegistrationCompletion) {
                // Redirect to registration completion flow
                navigate(`/checkout/complete-registration?checkoutSessionId=${checkoutSessionId}`);
            } else {
                // Skip registration and go directly to ELDT handoff
                handleAuthRedirect();
            }
        }
    }, [session, checkoutSessionId, navigate, isRedirecting]);

    if (loading) {
        return <FullpageLoader loadingText="Loading your purchase details..." />;
    }

    if (isRedirecting) {
        return <FullpageLoader loadingText="Redirecting to next step..." />;
    }

    if (error || !session) {
        return (
            <AppTheme {...props}>
                <CssBaseline />
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    padding: '2rem'
                }}>
                    <div style={{ textAlign: 'center' }}>
                        <Typography component="h1" variant="h4" mb={2} color="error">
                            Purchase Session Not Found
                        </Typography>
                        <Typography component="p" variant="body1" mb={2}>
                            We couldn't find your purchase session. This could happen if the link is expired or invalid.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/")}
                        >
                            Return to Home
                        </Button>
                    </div>
                </div>
            </AppTheme>
        );
    }

    return (
        <AppTheme {...props}>
            <CssBaseline />
            <EmailVerificationCard
                email={session.email}
                onResendEmail={handleResendEmail}
                onUpdateEmail={handleUpdateEmail}
                isResendingEmail={isPendingResendEmail}
                isUpdatingEmail={isPendingUpdateEmail}
            />
        </AppTheme>
    );
};

export default CheckoutComplete;

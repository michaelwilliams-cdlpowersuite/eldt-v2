import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FullpageLoader from "../../components/FullpageLoader";
import { useCheckoutEmailVerification } from "./hooks/useCheckoutEmailVerification";
import config from "../../config";
import { prepareHandoff } from "../../api/api";

const VerifyCheckoutEmail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const checkoutSessionId = searchParams.get("checkoutSessionId");
    const signature = searchParams.get("signature");
    const expires = searchParams.get("expires");
    const emailVerificationMutation = useCheckoutEmailVerification();

    const handleAuthRedirect = async () => {
        await prepareHandoff();
        localStorage.removeItem('apiToken');
        window.location.replace(config.angularClientUrl + '/eldt-handoff');
    };

    useEffect(() => {
        if (!checkoutSessionId || !signature || !expires) {
            navigate("/");
            return;
        }

        emailVerificationMutation.mutate(
            { checkoutSessionId, signature, expires },
            {
                onSuccess: (data) => {
                    if (data.requiresRegistrationCompletion) {
                        // Redirect to registration completion flow
                        navigate(`/checkout/complete-registration?checkoutSessionId=${checkoutSessionId}`);
                    } else {
                        // Skip registration and go directly to ELDT handoff
                        handleAuthRedirect();
                    }
                },
                onError: (error) => {
                    console.error("Email verification failed:", error);
                    // Redirect back to checkout complete page with error
                    navigate(`/checkout/complete?checkoutSessionId=${checkoutSessionId}&error=verification_failed`);
                },
            }
        );
    }, [checkoutSessionId, signature, expires, navigate]);

    return <FullpageLoader loadingText="Verifying your email..." />;
};

export default VerifyCheckoutEmail;

import {useEffect, useRef, useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FullpageLoader from "../../components/FullpageLoader";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";
import { useMe } from "../../hooks/useMe";
import {useAuth} from "../../auth/AuthProvider";

const EmailVerify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const emailVerificationMutation = useVerifyEmail();
  const { data: me, refetch } = useMe();
  const [polling, setPolling] = useState(false);
  const { setAuthentication } = useAuth();

  useEffect(() => {
    if (!userId || !token) {
      navigate("/");
      return;
    }

    emailVerificationMutation.mutate(
        { userId: parseInt(userId, 10), token },
        {
          onSuccess: (response) => {
            if (response.token) {
              setAuthentication(response.token);
            }

            setPolling(true);
          },
          onError: (error: Error) => {
            console.error("Email verification error:", error);
            navigate("/sign-in");
          },
        }
    );
  }, []);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (polling) {
      intervalId = setInterval(() => {
        refetch();
      }, 250);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [polling, refetch]);

  useEffect(() => {
    if (me?.emailVerifiedAt) {
      navigate("/register");
    }
  }, [me, navigate]);

  return <FullpageLoader loadingText="Verifying Email..." />;
};

export default EmailVerify;

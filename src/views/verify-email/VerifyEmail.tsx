import {useEffect, useRef, useState} from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FullpageLoader from "../../components/FullpageLoader";
import { useVerifyEmail } from "../../hooks/useVerifyEmail";
import { useMe } from "../../hooks/useMe";
import {useAuth} from "../../auth/AuthProvider";
import {useQueryClient} from "@tanstack/react-query";

const EmailVerify = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const emailVerificationMutation = useVerifyEmail();
  const { data: me } = useMe();
  const { setAuthentication } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId || !token) {
      navigate("/");
      return;
    }

    emailVerificationMutation.mutate(
      { userId: parseInt(userId, 10), token },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["me"] });
          navigate("/register");
        },
        onError: () => navigate("/sign-in"),
      }
    );
  }, []);

  useEffect(() => {
    if (me?.emailVerifiedAt) {
      navigate("/register", { replace: true });
    }
  }, [me, navigate]);

  return <FullpageLoader loadingText="Verifying Email..." />;
};

export default EmailVerify;

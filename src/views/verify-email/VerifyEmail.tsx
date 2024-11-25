import {useEffect, useRef} from "react";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";
import FullpageLoader from "../../components/FullpageLoader";
import {useVerifyEmail} from "../../hooks/useVerifyEmail";
import {useQueryClient} from "@tanstack/react-query";

const EmailVerify = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const token = searchParams.get('token');
  const emailVerificationMutation = useVerifyEmail();
  const queryClient = useQueryClient();

  // work around to only trigger the useEffect once in dev since we use strict mode
  // @see https://taig.medium.com/prevent-react-from-triggering-useeffect-twice-307a475714d7
  const initialized = useRef(false)

  useEffect(() => {
    if (!userId || !token) {
      navigate('/');
      return;
    }

    emailVerificationMutation.mutate({ userId: parseInt(userId), token }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['me'] })
        navigate('/register')
      },
      onError: () => navigate('/sign-in')
    })
  }, []);

  return <FullpageLoader loadingText="Verifying Email..."/>;
};

export default EmailVerify;

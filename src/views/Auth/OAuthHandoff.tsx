import {useEffect, useRef} from "react";
import {Navigate, useNavigate, useParams, useSearchParams} from "react-router-dom";
import FullpageLoader from "../../components/FullpageLoader";
import {useVerifyEmail} from "../../hooks/useVerifyEmail";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {retrieveHandoff} from "../../api/api";
import {useAuth} from "../../auth/AuthProvider";

const OAuthHandoff = () => {
  const navigate = useNavigate();
  const { setAuthentication } = useAuth();

  // work around to only trigger the useEffect once in dev since we use strict mode
  // @see https://taig.medium.com/prevent-react-from-triggering-useeffect-twice-307a475714d7
  const initialized = useRef(false)

  const { data } = useQuery({
    queryKey: ['handoff'],
    queryFn: retrieveHandoff
  });

  if (data && data.accessToken) {
    setAuthentication(data.accessToken)

    return <Navigate to='/register' />
  }

  return <FullpageLoader loadingText="Logging in..."/>;
};

export default OAuthHandoff;

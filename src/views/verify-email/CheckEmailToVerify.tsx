import { CssBaseline } from "@mui/material";
import * as React from "react";
import { useMe } from "../../hooks/useMe";
import { useResendVerificationEmail } from "../../hooks/useResendVerificationEmail";
import { useUpdateEmail } from "../../hooks/useUpdateEmail";
import AppTheme from "../../styles/shared-theme/AppTheme";
import { Navigate } from "react-router-dom";
import EmailVerificationCard from "../../components/EmailVerificationCard";


interface CheckEmailToVerifyProps {
  disableCustomTheme?: boolean;
}

const CheckEmailToVerify: React.FC<CheckEmailToVerifyProps> = (props: {
  disableCustomTheme?: boolean;
}) => {
  const { data: me } = useMe();
  const { mutate: resendEmail, isPending: isPendingResendEmail } =
    useResendVerificationEmail();
  const { mutate: updateEmail, isPending: isPendingUpdateEmail } =
    useUpdateEmail();

  const handleResendEmail = () => {
    resendEmail();
  };

  const handleUpdateEmail = (email: string) => {
    updateEmail(email);
  };

  if (me?.emailVerifiedAt) {
    return <Navigate to="/register" />;
  }

  return (
    <AppTheme {...props}>
      <CssBaseline />
      <EmailVerificationCard
        email={me?.email || ''}
        onResendEmail={handleResendEmail}
        onUpdateEmail={handleUpdateEmail}
        isResendingEmail={isPendingResendEmail}
        isUpdatingEmail={isPendingUpdateEmail}
      />
    </AppTheme>
  );
};

export default CheckEmailToVerify;

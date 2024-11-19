import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import AppTheme from "../mui-templates/shared-theme/AppTheme";
import ColorModeSelect from "../mui-templates/shared-theme/ColorModeSelect";
import { Card, SignUpContainer } from "../mui-templates/sign-up/SignUp";
import LogoIcon from "../../assets/LogoIconELDT";
import { brandColors } from "../../styles/brandColors";
import { useMe } from "../../hooks/useMe";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

interface VerifyEmailProps {
  disableCustomTheme?: boolean;
}

const VerifyEmail: React.FC<VerifyEmailProps> = (props: {
  disableCustomTheme?: boolean;
}) => {
  const handleResendEmail = () => {
    console.log("Resend email");
  };

  const handleUpdateEmail = () => {
    console.log("Update email");
  };

  const { data: me, isLoading, error } = useMe();
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignUpContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <CheckCircleOutlineIcon
            sx={{
              fontSize: "100px",
              color: brandColors.goGreen,
              margin: "0 auto",
            }}
          />
          {/* <LogoIcon
            sx={{
              width: "250px",
              height: "55px",
              color: brandColors.cdlDarkBlue,
              margin: "0 auto 1rem",
            }}
          /> */}
          <Typography component="h1" variant="h4" textAlign="center" mb={2}>
            Verify Your Email
          </Typography>
          <Typography component="p" variant="body1" textAlign="center" mb={2}>
            You have entered <strong>{me?.email}</strong> as the email address
            for your account. Please check your inbox to verify your email and
            complete registration.
          </Typography>
          <Divider />
          <Typography component="h1" variant="h6" textAlign="center" mb={2}>
            Didn’t receive the email?
          </Typography>
          <ol style={{ margin: "0 0 1rem 1.5rem" }}>
            <li>Check your spam or junk folders.</li>

            <li>Click "Resend Verification Email" to receive a new link.</li>
          </ol>
          <Button
            variant="contained"
            color="primary"
            onClick={handleResendEmail}
            fullWidth
          >
            Resend Verification Email
          </Button>
          <Divider />
          <Typography component="h1" variant="h6" textAlign="center" mb={2}>
            Update Email Address?
          </Typography>
          <Typography component="p" variant="body1" textAlign="center" mb={2}>
            If you entered the wrong email address, you can update it here.
          </Typography>
          <Button variant="outlined" onClick={handleUpdateEmail} fullWidth>
            Update Email
          </Button>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
};

export default VerifyEmail;

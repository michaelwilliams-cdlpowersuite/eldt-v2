import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CssBaseline,
  Divider,
  Link,
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
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
        <Card variant="outlined" sx={{ width: { md: "550px" } }}>
          <CheckCircleOutlineIcon
            sx={{
              fontSize: "100px",
              color: brandColors.goGreen,
              margin: "0 auto",
            }}
          />
          <Typography component="h1" variant="h4" textAlign="center" mb={2}>
            Verify Your Email
          </Typography>
          <Typography component="p" variant="body1" textAlign="center" mb={2}>
            You have entered <strong>{me?.email}</strong> as the email address
            for your account. Please check your inbox to verify your email to
            complete registration.
          </Typography>
          <Divider />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Didn’t receive the email?
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="p" variant="body1" mb={2}>
                If you didn’t receive the email, try these steps:
                <li>Check your spam or junk folders.</li>
                <li>
                  Click "Resend Verification Email" to receive a new link.
                </li>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleResendEmail}
                fullWidth
              >
                Resend Verification Email
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Wrong email address?
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="p" variant="body1" mb={2}>
                If you entered the wrong email address, you can update it here.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleUpdateEmail}
                fullWidth
              >
                Update Email
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Still having trouble?
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="p" variant="body1" mb={2}>
                Contact customer support.
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Phone Number */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <PhoneIcon sx={{ color: "primary.main" }} />
                  <Link
                    href="tel:15092412987"
                    underline="none"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "text.primary",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    1.509.241.2987
                  </Link>
                </Stack>
                {/* Email Address */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon sx={{ color: "primary.main" }} />
                  <Link
                    href="mailto:info@cdlpowersuite.com"
                    underline="none"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "text.primary",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    info@cdlpowersuite.com
                  </Link>
                </Stack>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <LogoIcon
              sx={{
                width: "150px",
                height: "30px",
                color: brandColors.cdlDarkBlue,
                margin: "0 auto 1rem",
              }}
            />
            <Stack
              direction="row"
              alignContent="center"
              justifyContent="space-around"
            >
              {/* Phone Number */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <PhoneIcon sx={{ color: "primary.main" }} />
                <Link
                  href="tel:15092412987"
                  underline="none"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  1.509.241.2987
                </Link>
              </Stack>

              {/* Email Address */}
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                spacing={1}
              >
                <EmailIcon sx={{ color: "primary.main" }} />
                <Link
                  href="mailto:info@cdlpowersuite.com"
                  underline="none"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  info@cdlpowersuite.com
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
};

export default VerifyEmail;

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/Phone";
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
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import * as React from "react";
import LogoIcon from "../../assets/LogoIconELDT";
import { useMe } from "../../hooks/useMe";
import { useResendVerificationEmail } from "../../hooks/useResendVerificationEmail";
import { useUpdateEmail } from "../../hooks/useUpdateEmail";
import { brandColors } from "../../styles/brandColors";
import AppTheme from "../../styles/shared-theme/AppTheme";
import ColorModeSelect from "../../styles/shared-theme/ColorModeSelect";
import { Navigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "auto",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

interface CheckEmailToVerifyProps {
  disableCustomTheme?: boolean;
}

const CheckEmailToVerify: React.FC<CheckEmailToVerifyProps> = (props: {
  disableCustomTheme?: boolean;
}) => {
  const [openUpdateEmail, setOpenUpdateEmail] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const { data: me } = useMe();
  const { mutate: resendEmail, isPending: isPendingResendEmail } =
    useResendVerificationEmail();
  const { mutate: updateEmail, isPending: isPendingUpdateEmail } =
    useUpdateEmail();

  const handleResendEmail = () => {
    resendEmail();
  };

  const handleOpenUpdateEmail = () => {
    setOpenUpdateEmail(true);
  }

  const handleUpdateEmail = (email: string) => {
    updateEmail(email);
    setOpenUpdateEmail(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  if (me?.emailVerifiedAt) {
    return <Navigate to="/register" />;
  }

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
                variant="contained"
                color="primary"
                onClick={handleOpenUpdateEmail}
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
                    href="tel:15092413987"
                    underline="none"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "text.primary",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    1.509.241.3987
                  </Link>
                </Stack>
                {/* Email Address */}
                <Stack direction="row" alignItems="center" spacing={1}>
                  <EmailIcon sx={{ color: "primary.main" }} />
                  <Link
                    href="mailto:info@eldt.com"
                    underline="none"
                    sx={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: "text.primary",
                      "&:hover": { color: "primary.main" },
                    }}
                  >
                    info@eldt.com
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
              direction={{
                xs: "column",
                md: "row",
              }}
              sx={{ gap: 2 }}
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
                  href="tel:15092413987"
                  underline="none"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  1.509.241.3987
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
                  href="mailto:info@eldt.com"
                  underline="none"
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 500,
                    color: "text.primary",
                    "&:hover": { color: "primary.main" },
                  }}
                >
                  info@eldt.com
                </Link>
              </Stack>
            </Stack>
          </Box>
        </Card>
      </SignUpContainer>
      <Dialog open={openUpdateEmail} onClose={() => setOpenUpdateEmail(false)}>
        <DialogTitle>Update Email</DialogTitle>
        <DialogContent>
          <Typography component="p" variant="body1" mb={2}>
            Enter your new email address below.
            </Typography>
        <TextField value={email} onChange={handleEmailChange} label="New Email" sx={{mt: 1}} fullWidth />
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpenUpdateEmail(false)}>Cancel</Button>
            <Button onClick={() => handleUpdateEmail(email)} disabled={isPendingUpdateEmail} color="primary">
                Update Email
            </Button>
        </DialogActions>
      </Dialog>
    </AppTheme>
  );
};

export default CheckEmailToVerify;

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
import { useNavigate, useSearchParams } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import LogoIcon from "../../assets/LogoIconELDT";
import { brandColors } from "../../styles/brandColors";
import AppTheme from "../../styles/shared-theme/AppTheme";
import ColorModeSelect from "../../styles/shared-theme/ColorModeSelect";
import { useCheckoutSession } from "./hooks/useCheckoutSession";
import { useCheckoutEmailUpdate } from "./hooks/useCheckoutEmailUpdate";
import FullpageLoader from "../../components/FullpageLoader";

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

interface CheckoutCompleteProps {
    disableCustomTheme?: boolean;
}

const CheckoutComplete: React.FC<CheckoutCompleteProps> = (props) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [openUpdateEmail, setOpenUpdateEmail] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const checkoutSessionId = searchParams.get("checkout_session_id");
    const { session, loading, error } = useCheckoutSession(checkoutSessionId);
    const { mutate: updateEmail, isPending: isPendingUpdateEmail } = useCheckoutEmailUpdate();

    React.useEffect(() => {
        if (!checkoutSessionId) {
            // Redirect to home if no checkout session ID
            navigate("/");
            return;
        }
    }, [checkoutSessionId, navigate]);

    const handleResendEmail = () => {
        // TODO: Implement resend email functionality for checkout sessions
        console.log("Resend email for checkout session:", checkoutSessionId);
    };

    const handleOpenUpdateEmail = () => {
        setEmail(session?.email || "");
        setOpenUpdateEmail(true);
    };

    const handleUpdateEmail = (newEmail: string) => {
        if (checkoutSessionId && newEmail) {
            updateEmail({
                checkoutSessionId,
                email: newEmail
            });
            setOpenUpdateEmail(false);
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    if (loading) {
        return <FullpageLoader loadingText="Loading your purchase details..." />;
    }

    if (error || !session) {
        return (
            <AppTheme {...props}>
                <CssBaseline enableColorScheme />
                <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
                <SignUpContainer direction="column" justifyContent="center">
                    <Card variant="outlined" sx={{ width: { md: "550px" } }}>
                        <Typography component="h1" variant="h4" textAlign="center" mb={2} color="error">
                            Purchase Session Not Found
                        </Typography>
                        <Typography component="p" variant="body1" textAlign="center" mb={2}>
                            We couldn't find your purchase session. This could happen if the link is expired or invalid.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/")}
                            fullWidth
                        >
                            Return to Home
                        </Button>
                    </Card>
                </SignUpContainer>
            </AppTheme>
        );
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
                        Purchase Complete!
                    </Typography>
                    <Typography component="h2" variant="h6" textAlign="center" mb={2}>
                        Verify Your Email to Continue
                    </Typography>
                    <Typography component="p" variant="body1" textAlign="center" mb={2}>
                        Thank you for your purchase! We've sent a verification email to{" "}
                        <strong>{session.email}</strong>. Please check your inbox and click the
                        verification link to complete your account setup and access your course.
                    </Typography>
                    <Divider />
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Didn't receive the email?
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component="p" variant="body1" mb={2}>
                                If you didn't receive the email, try these steps:
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
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            Wrong email address?
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography component="p" variant="body1" mb={2}>
                                If you entered the wrong email address during checkout, you can update it here.
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
                            aria-controls="panel3-content"
                            id="panel3-header"
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

            {/* Update Email Dialog */}
            <Dialog open={openUpdateEmail} onClose={() => setOpenUpdateEmail(false)}>
                <DialogTitle>Update Email Address</DialogTitle>
                <DialogContent>
                    <Typography component="p" variant="body1" mb={2}>
                        Enter your new email address below. We'll send the verification email to this new address.
                    </Typography>
                    <TextField
                        value={email}
                        onChange={handleEmailChange}
                        label="New Email"
                        type="email"
                        sx={{ mt: 1 }}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenUpdateEmail(false)}>Cancel</Button>
                    <Button
                        onClick={() => handleUpdateEmail(email)}
                        disabled={isPendingUpdateEmail || !email}
                        color="primary"
                        variant="contained"
                    >
                        Update Email
                    </Button>
                </DialogActions>
            </Dialog>
        </AppTheme>
    );
};

export default CheckoutComplete;

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import LogoIcon from "../../assets/LogoIconELDT";
import { useSignUpMutation } from "../../hooks/useSignUp";
import { brandColors } from "../../styles/brandColors";
import { GoogleIcon } from "./CustomIcons";
import PasswordValidator from "./PasswordValidator";
import config from "../../config";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
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
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
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

// Only validate the email with Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  // No validation for password or confirmPassword
});

export default function SignUpCard(props: { disableCustomTheme?: boolean }) {
  // Password states remain as-is for your existing "visual aid" logic
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  // This tracks whether the password is valid based on your PasswordValidator
  const [isPasswordValid, setIsPasswordValid] = React.useState(false);

  // Set up Formik for the email only
  const signUpMutation = useSignUpMutation();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // Combine Formik’s email with your locally-managed password
      signUpMutation.mutate({
        email: values.email,
        password,
      });
    },
  });

  // Toggle show/hide password
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  // Prevent MUI from losing focus on IconButton
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Capture password changes for your visual aid
  const handlePasswordValidationChange = (valid: boolean) => {
    setIsPasswordValid(valid);
  };

  // Submit the form using Formik's handleSubmit
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    formik.handleSubmit(event);
  };

  // Show password requirements only if something is entered
  const showPasswordValidator = password.length > 0 || confirmPassword.length > 0;

  return (
      <Card variant="outlined">
        {/* Logo on small screens, unchanged */}
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <LogoIcon
              sx={{
                width: "250px",
                height: "55px",
                color: brandColors.cdlDarkBlue,
                margin: "0 auto",
              }}
          />
        </Box>

        <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
        </Typography>

        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
                required
                fullWidth
                id="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                variant="outlined"
                // Formik's state
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // Display Yup errors for the email
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={
                  formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                }
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                variant="outlined"
                // Local state tracking
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // Show/hide password icon
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                            aria-label={
                              showPassword
                                  ? "hide the password"
                                  : "display the password"
                            }
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  ),
                }}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password">Confirm Password</FormLabel>
            <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                autoComplete="new-password"
                variant="outlined"
                // Local state tracking
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                            aria-label={
                              showConfirmPassword
                                  ? "hide the password"
                                  : "display the password"
                            }
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  ),
                }}
            />
          </FormControl>

          {showPasswordValidator && (
              <PasswordValidator
                  password={password}
                  confirmPassword={confirmPassword}
                  onValidationChange={handlePasswordValidationChange}
              />
          )}

          <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!isPasswordValid || !formik.isValid}
          >
            Sign up
          </Button>
        </Box>

        <Divider>
          <Typography sx={{ color: "text.secondary" }}>or</Typography>
        </Divider>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
              fullWidth
              variant="outlined"
              href={config.googleSignIn}
              startIcon={<GoogleIcon />}
          >
            Sign up with Google
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link
                href="/sign-in"
                variant="body2"
                sx={{ alignSelf: "center" }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
  );
}

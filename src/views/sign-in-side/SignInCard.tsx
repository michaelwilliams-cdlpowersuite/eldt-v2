import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import { useFormik } from "formik";
import LogoIcon from "../../assets/LogoIconELDT";
import { useLoginMutation } from "../../hooks/useLogin";
import { brandColors } from "../../styles/brandColors";
import { GoogleIcon } from "./CustomIcons";
import ForgotPassword from "./ForgotPassword";
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

// Create a Yup schema for email validation only
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
});

export default function SignInCard() {
  const [open, setOpen] = React.useState(false);
  const loginMutation = useLoginMutation();

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      loginMutation.mutate({ email: values.email, password: values.password });
    },
  });

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
      <Card variant="outlined">
        {/* Logo (visible on small screens) */}
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
          Sign in
        </Typography>

        {/* Formik Form */}
        <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={
                  formik.touched.email && formik.errors.email
                      ? "error"
                      : "primary"
                }
                // Formik bindings
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={
                  formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                }
            />
          </FormControl>

          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Link
                  component="button"
                  type="button"
                  onClick={handleClickOpen}
                  variant="body2"
                  sx={{ alignSelf: "baseline" }}
              >
                Forgot your password?
              </Link>
            </Box>
            <TextField
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={
                  formik.touched.password && formik.errors.password
                      ? "error"
                      : "primary"
                }
                // Formik bindings
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // No validation errors displayed since password is not validated
                error={false}
                helperText=""
            />
          </FormControl>

          <ForgotPassword open={open} handleClose={handleClose} />

          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>

          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <span>
            <Link
                href="/sign-up"
                variant="body2"
                sx={{ alignSelf: "center" }}
            >
              Sign up
            </Link>
          </span>
          </Typography>
        </Box>

        <Divider>or</Divider>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
              fullWidth
              variant="outlined"
              href={config.googleSignIn}
              startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
        </Box>
      </Card>
  );
}

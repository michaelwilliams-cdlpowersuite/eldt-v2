import React from "react";
import { Typography, Box, Grid2 } from "@mui/material";

interface PasswordValidatorProps {
  password: string;
  confirmPassword: string;
}

const PasswordValidator: React.FC<PasswordValidatorProps> = ({
  password,
  confirmPassword,
}) => {
  const rules = [
    {
      text: "At least 8 characters",
      isValid: password.length >= 8,
    },
    {
      text: "At least 1 number",
      isValid: /\d/.test(password),
    },
    {
      text: "At least 1 special character",
      isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
    {
      text: "At least 1 uppercase letter",
      isValid: /[A-Z]/.test(password),
    },
    {
      text: "At least 1 lowercase letter",
      isValid: /[a-z]/.test(password),
    },
    {
      text: "Passwords Match",
      isValid: password === confirmPassword,
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Grid2 container spacing={1}>
        {rules.map((rule, index) => (
          <Grid2 size={6} key={index}>
            <Typography
              sx={{
                fontSize: "0.875rem",
                color: rule.isValid ? "green" : "red",
                display: "flex",
                alignItems: "center",
              }}
            >
              {rule.isValid ? "✔" : "✘"} {rule.text}
            </Typography>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default PasswordValidator;

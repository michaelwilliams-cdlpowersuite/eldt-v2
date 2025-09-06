import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import FormikAutocomplete from "../../registration/components/FormikAutocomplete";
import FormikTextField from "../../registration/components/FormikTextField";
import { languages } from "../../registration/utilities/languages";
import { pxContainer, titleStyles } from "../../registration/utilities/styles";
import PhoneNumberField from "../../registration/components/PhoneNumberField";

interface CheckoutStep2Props { }

const CheckoutStep2: React.FC<CheckoutStep2Props> = () => {
    return (
        <Box sx={{ px: pxContainer }}>
            <Typography variant="h6" sx={titleStyles}>
                Personal Info
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                Please provide your personal details to complete your registration
            </Typography>
            <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <FormikTextField name="step2.firstName" label="First Name" />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <FormikTextField name="step2.lastName" label="Last Name" />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <PhoneNumberField name="step2.phone" />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <FormikAutocomplete
                        name="step2.language"
                        options={languages}
                        isOptionEqualToValue={(option, value) => option === value}
                        getOptionLabel={(option: { label: any }) => option.label}
                        textFieldProps={{ label: "Language" }}
                    />
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 6 }}>
                    <FormikTextField
                        name="step2.where"
                        label="Name of BTW trainer?"
                        helperText="What School or Agency will you be attending for your Public Road and Range Training (BTW)?"
                    />
                </Grid2>
            </Grid2>
        </Box>
    );
};

export default CheckoutStep2;

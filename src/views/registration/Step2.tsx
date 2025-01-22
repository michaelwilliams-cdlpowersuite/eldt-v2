import {Box, Grid2, Typography} from "@mui/material";
import React from "react";
import FormikAutocomplete from "./components/FormikAutocomplete";
import FormikTextField from "./components/FormikTextField";
import {languages} from "./utilities/languages";
import {pxContainer, titleStyles} from "./utilities/styles";
import PhoneNumberField from "./components/PhoneNumberField";
import {useFormikContext} from "formik";

interface Step2Props {}

const Step2: React.FC<Step2Props> = () => {
  const { values } = useFormikContext<any>();
  const hasOnlyHaz =
      values.step1.selectedEndorsements.length > 0 &&
      values.step1.selectedEndorsements.every((endorsement: any) => endorsement === '1') &&
      !values.step1.selectedCourse;

  return (
    <Box sx={{ px: pxContainer }}>
      <Typography variant="h6" sx={titleStyles}>
        Personal Info
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
        {!hasOnlyHaz && (
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormikTextField
              name="step2.where"
              label="Name of BTW trainer?"
              helperText="What School or Agency will you be attending for your Public Road and Range Training (BTW)?"
          />
        </Grid2>)}
      </Grid2>
    </Box>
  );
};

export default Step2;



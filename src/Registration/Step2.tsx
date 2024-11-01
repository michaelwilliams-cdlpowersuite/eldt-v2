import { Box, Grid2, Typography } from "@mui/material";
import FormikAutocomplete from "./components/FormikAutocomplete";
import FormikDatePicker from "./components/FormikDatePicker";
import FormikTextField from "./components/FormikTextField";
import { languages } from "./enums/languages";
import { states } from "./enums/statesList";
import { pxContainer, viewTitleStyles } from "./enums/styles";

interface Step2Props {}

const Step2: React.FC<Step2Props> = () => {
  return (
    <Box sx={{ px: pxContainer }}>
      <Typography variant="h6" sx={viewTitleStyles}>
        Personal Info
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <FormikTextField name="step2.firstName" label="First Name" />
        </Grid2>
        <Grid2 size={6}>
          <FormikTextField name="step2.lastName" label="Last Name" />
        </Grid2>
        <Grid2 size={6}>
          <FormikTextField name="step2.phone" label="phone" />
        </Grid2>
        <Grid2 size={6}>
          <FormikDatePicker name="step2.dob" label="DOB" />
        </Grid2>
        <Grid2 size={6}>
          <FormikTextField
            name="step2.driversLicense"
            label="Driver's License"
          />
        </Grid2>
        <Grid2 size={6}>
          <FormikTextField
            name="step2.confirmDriversLicense"
            label="Confirm Driver's License"
          />
        </Grid2>
        <Grid2 size={12}>
          <FormikTextField name="step2.streetAddress" label="Address" />
        </Grid2>
        <Grid2 size={4}>
          <FormikTextField name="step2.zip" label="Zip" />
        </Grid2>
        <Grid2 size={4}>
          <FormikTextField name="step2.city" label="City" />
        </Grid2>
        <Grid2 size={4}>
          <FormikAutocomplete
            name="step2.state"
            options={states}
            getOptionLabel={(option: { label: any }) => option.label}
            textFieldProps={{ label: "State" }}
          />
        </Grid2>
        <Grid2 size={6}>
          <FormikAutocomplete
            name="step2.language"
            options={languages}
            getOptionLabel={(option: { label: any }) => option.label}
            textFieldProps={{ label: "Language" }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Step2;

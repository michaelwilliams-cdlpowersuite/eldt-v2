import { Box, Grid2, Typography } from "@mui/material";
import FormikAutocomplete from "./components/FormikAutocomplete";
import FormikDatePicker from "./components/FormikDatePicker";
import FormikTextField from "./components/FormikTextField";
import { states } from "./enums/statesList";
import { pxContainer, viewTitleStyles } from "./enums/styles";
import { languages } from "./enums/languages";

interface View2Props {}

const View2: React.FC<View2Props> = () => {
  return (
    <Box sx={{ px: pxContainer }}>
      <Typography variant="h6" sx={viewTitleStyles}>
        Personal Info
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <FormikTextField name="firstName" label="First Name" />
        </Grid2>
        <Grid2 size={6}>
          <FormikTextField name="lastName" label="Last Name" />
        </Grid2>
        <Grid2 size={6}>
          <FormikTextField name="phone" />
        </Grid2>
        <Grid2 size={6}>
          <FormikDatePicker name="birthday" label="DOB" />
        </Grid2>
        <Grid2 size={6}>
          <FormikTextField name="driversLicense" label="Driver's License" />
        </Grid2>
        <Grid2 size={6}>
          <FormikTextField
            name="confirmDriversLicense"
            label="Confirm Driver's License"
          />
        </Grid2>
        <Grid2 size={12}>
          <FormikTextField name="address" />
        </Grid2>
        <Grid2 size={4}>
          <FormikTextField name="zip" />
        </Grid2>
        <Grid2 size={4}>
          <FormikTextField name="city" />
        </Grid2>
        <Grid2 size={4}>
          <FormikAutocomplete
            name="state"
            options={states}
            getOptionLabel={(option: { label: any }) => option.label}
            textFieldProps={{ label: "State" }}
          />
        </Grid2>
        <Grid2 size={6}>
          <FormikAutocomplete
            name="language"
            options={languages}
            getOptionLabel={(option: { label: any }) => option.label}
            textFieldProps={{ label: "Language" }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default View2;

import { Box, Grid2, Typography } from "@mui/material";
import React from "react";
import { IMaskInput } from "react-imask";
import FormikAutocomplete from "./components/FormikAutocomplete";
import FormikDatePicker from "./components/FormikDatePicker";
import FormikTextField from "./components/FormikTextField";
import { languages } from "./utilities/languages";
import { states } from "./utilities/statesList";
import { pxContainer, titleStyles } from "./utilities/styles";
import PhoneNumberField from "./components/PhoneNumberField";

interface Step2Props {}

const Step2: React.FC<Step2Props> = () => {
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
          <PhoneNumberField name="phone" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormikAutocomplete
            name="step2.language"
            options={languages}
            getOptionLabel={(option: { label: any }) => option.label}
            textFieldProps={{ label: "Language" }}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormikTextField
              name="step2.where"
              label="Where will you be training?"
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Step2;

// This code is for the phone mask
// it is lifted from the docs, here:
//https://mui.com/material-ui/react-text-field/#integration-with-3rd-party-input-libraries
interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="#00-000-0000"
        definitions={{
          "#": /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

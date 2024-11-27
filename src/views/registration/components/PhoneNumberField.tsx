import { TextField } from "@mui/material";
import { useField, useFormikContext } from "formik";
import React from "react";

type TextFieldProps = {
  name: string;
};

const PhoneNumberField: React.FC<TextFieldProps> = ({ name }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, "");

    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`; // (XXX) XXX
    } else {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
        6,
        10
      )}`;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setFieldValue(name, input.replace(/\D/g, ""));
  };

  return (
    <TextField
      {...field}
      label="Phone Number"
      value={formatPhoneNumber(field.value || "")}
      onChange={handleChange}
      slotProps={{
        input: {
          inputProps: {
            maxLength: 14,
          },
        },
      }}
      fullWidth
      margin="normal"
      variant="outlined"
    />
  );
};

export default PhoneNumberField;

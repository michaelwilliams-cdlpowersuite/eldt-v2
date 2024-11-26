import {
  Autocomplete,
  AutocompleteProps, InputBase, SelectChangeEvent,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import React, {ReactNode} from "react";
import {styled} from "@mui/material/styles";
import Select from "@mui/material/Select";
import {SelectProps} from "@mui/material/Select/Select";

type FormikAutocompleteProps<T, Multiple extends boolean = false> = Omit<
  SelectProps<T>,
  "renderInput"
> & {
  name: string;
  dependentAnswer?: string;
  textFieldProps?: TextFieldProps;
  multiple?: Multiple;
};

const FormikAutocomplete = <T, Multiple extends boolean = false>({
  name,
  dependentAnswer,
  textFieldProps,
  multiple = false as Multiple, // Default to false
  ...props
}: FormikAutocompleteProps<T, Multiple>) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleChange = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setFieldValue(name, value); // Update Formik's state with single or multiple values
  };

  const value = multiple ? field.value || [] : field.value || null;

  return (
    <Select
      multiple={multiple}
      value={value} // Dynamically handle value based on 'multiple'
      onChange={handleChange}
      // renderInput={(params) => (
      //   <TextField
      //     {...params}
      //     {...textFieldProps} // Spread any TextFieldProps passed in
      //     error={meta.touched && Boolean(meta.error)}
      //     helperText={meta.touched && meta.error}
      //     fullWidth
      //     margin="normal"
      //     autoFocus={false}
      //     onBlur={() => setFieldTouched(name, true, true)}
      //   />
      // )}
    />
  );
};

export default FormikAutocomplete;

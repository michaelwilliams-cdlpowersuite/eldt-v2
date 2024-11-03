import React, { useEffect } from "react";
import { getIn, useField, useFormikContext } from "formik";
import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  TextFieldProps,
} from "@mui/material";

type FormikAutocompleteProps<T, Multiple extends boolean = false> = Omit<
  AutocompleteProps<T, Multiple, false, false>,
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
  const { values, setFieldValue, setFieldTouched } = useFormikContext();

  const handleChange = (event: React.SyntheticEvent, value: T | T[] | null) => {
    setFieldValue(name, value); // Update Formik's state with single or multiple values
  };

  const value = multiple ? field.value || [] : field.value || null;

  // TODO Preselect answers that have already been provided
  //   useEffect(() => {
  //     if (!dependentAnswer) {
  //       return;
  //     }
  //     // Access the dependent answer dynamically
  //     const dependentValue = getIn(values, dependentAnswer);

  //     if (dependentValue) {
  //       console.log("props.options", props.options);
  //       console.log("dependentAnswer value", dependentValue);

  //       // Find the matching option based on the dependent value
  //       const initialValue = props.options.find(
  //         (option) => option === dependentValue
  //       );

  //       if (initialValue) {
  //         setFieldValue(name, initialValue);
  //       }
  //     }
  //   }, [dependentAnswer, values, props.options, setFieldValue, name]);

  return (
    <Autocomplete
      {...props}
      multiple={multiple}
      value={value} // Dynamically handle value based on 'multiple'
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps} // Spread any TextFieldProps passed in
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
          fullWidth
          margin="normal"
          onBlur={() => setFieldTouched(name, true, true)}
        />
      )}
    />
  );
};

export default FormikAutocomplete;

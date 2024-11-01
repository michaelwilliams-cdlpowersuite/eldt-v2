import React from "react";
import { useField, useFormikContext } from "formik";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { TextField, TextFieldProps } from "@mui/material";
import { Dayjs } from "dayjs";

type FormikDatePickerProps = Omit<
  DatePickerProps<Dayjs, false>,
  "value" | "onChange"
> & {
  name: string;
  textFieldProps?: TextFieldProps; // Optional: To pass additional props to TextField
};

const FormikDatePicker: React.FC<FormikDatePickerProps> = ({
  name,
  textFieldProps,
  ...props
}) => {
  const [field, meta] = useField(name);
  const { setFieldValue, setFieldTouched } = useFormikContext();

  const handleChange = (value: Dayjs | null) => {
    setFieldValue(name, value); // Update Formik's state
  };

  console.log("touched: ", meta.touched);
  console.log("error: ", meta.error);
  console.log("value: ", field.value);

  return (
    <DatePicker
      {...props}
      value={field.value || null} // Handle null values
      onChange={handleChange}
      slotProps={{
        textField: {
          ...textFieldProps, // Spread additional TextField props
          error: meta.touched && Boolean(meta.error),
          helperText: meta.touched && meta.error,
          fullWidth: true,
          margin: "normal",
          onBlur: () => setFieldTouched(name, true, true),
        },
      }}
    />
  );
};

export default FormikDatePicker;

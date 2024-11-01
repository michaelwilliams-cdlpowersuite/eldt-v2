import { TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useField, useFormikContext } from "formik";
import React from "react";

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

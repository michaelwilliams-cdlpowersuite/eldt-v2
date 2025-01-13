import React from "react";
import {TextField, TextFieldProps} from "@mui/material";
import {useField} from "formik";

type FormikTextFieldProps = TextFieldProps & {
    name: string; // The field name to bind with Formik
};

const FormikTextField: React.FC<FormikTextFieldProps> = ({
                                                             name,
                                                             ...props
                                                         }) => {
    const [field, meta] = useField(name);

    return (
        <TextField
            {...field}
            // default props to use if not specified, these can be overridden by {...props}
            label={name.charAt(0).toUpperCase() + name.slice(1)}
            variant="outlined"
            {...props} // Optional: Spread any additional MUI TextField props
            error={meta.touched && Boolean(meta.error)} helperText={
            meta.touched && meta.error
                ? meta.error
                : props.helperText
        }
            fullWidth
            margin="normal"
        />
    );
};

export default FormikTextField;

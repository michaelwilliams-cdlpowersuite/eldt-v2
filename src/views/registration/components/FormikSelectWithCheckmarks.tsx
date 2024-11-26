import React from "react";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  SelectProps,
  InputLabel,
  FormControl,
  FormHelperText,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";
import { useField, useFormikContext } from "formik";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type FormikSelectWithCheckmarksProps<T> = Omit<
  SelectProps<(string | number)[]>,
  "onChange" | "value"
> & {
  name: string;
  options: T[];
  getOptionValue: (option: T) => string | number;
  getOptionLabel: (option: T) => string;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: T,
    selected: boolean
  ) => React.ReactNode;
  label?: string;
  multiple?: boolean;
};

const FormikSelectWithCheckmarks = <T,>({
  name,
  options,
  getOptionValue,
  getOptionLabel,
  renderOption,
  label,
  multiple = false,
  ...props
}: FormikSelectWithCheckmarksProps<T>) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setFieldValue(name, event.target.value as (string | number)[]);
  };

  const isSelected = (value: string | number) =>
    Array.isArray(field.value) && field.value.includes(value);

  const value = multiple ? field.value || [] : field.value || null;

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
        <Select
          {...props}
          labelId={`${name}-select-label`}
          id={`${name}-select`}
          multiple={multiple}
          value={value}
          name={name}
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => {
            if (multiple) {
              return (selected as (string | number)[]).join(", ");
            }
            // For single selection, just display the label of the selected value
            const selectedOption = options.find(
              (option) => getOptionValue(option) === selected
            );
            return selectedOption ? getOptionLabel(selectedOption) : "";
          }}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={getOptionValue(option)}
              value={getOptionValue(option)}
            >
              {multiple && (
                <Checkbox checked={isSelected(getOptionValue(option))} />
              )}
              <ListItemText primary={getOptionLabel(option)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FormikSelectWithCheckmarks;

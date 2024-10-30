import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox, Grid2, Paper, Typography } from "@mui/material";
import FormikAutocomplete from "./components/FormikAutocomplete";
import FormikDatePicker from "./components/FormikDatePicker";
import {
  cdlTypes,
  endorsements,
  transmissions,
  workTypes,
} from "./enums/optionsLists";
import { viewTitleStyles } from "./enums/styles";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface View3Props {}

const View3: React.FC<View3Props> = () => {
  return (
    <>
      <Typography variant="h5" sx={viewTitleStyles}>
        Additional Details
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={6}>
          <FormikAutocomplete
            name="transmission"
            options={transmissions}
            getOptionLabel={(option: { label: any }) => option.label}
            textFieldProps={{ label: "Choose your transmission" }}
          />
        </Grid2>

        <Grid2 size={6}>
          <FormikDatePicker name="cdlDate" />
        </Grid2>
      </Grid2>
      <Paper
        elevation={1}
        sx={{ width: "100%", padding: 2, bgcolor: "salmon" }}
      >
        <Typography variant="h5" textAlign="center">
          Once your training is complete...
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <FormikAutocomplete
              name="cdlType"
              options={cdlTypes}
              getOptionLabel={(option: { label: any }) => option.label}
              textFieldProps={{ label: "What type of CDL will you have?" }}
              disableCloseOnSelect
              multiple
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                );
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <FormikAutocomplete
              name="endorsements"
              options={endorsements}
              getOptionLabel={(option: { label: any }) => option.label}
              textFieldProps={{
                label: "What type of endorsements will you have?",
              }}
              disableCloseOnSelect
              multiple
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                );
              }}
            />
          </Grid2>
          <Grid2 size={6}>
            <FormikAutocomplete
              name="workTypes"
              options={workTypes}
              getOptionLabel={(option: { label: any }) => option.label}
              textFieldProps={{
                label: "What type of work are you looking for?",
              }}
              disableCloseOnSelect
              multiple
              renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                  <li key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                );
              }}
            />
          </Grid2>
        </Grid2>
      </Paper>
    </>
  );
};

export default View3;

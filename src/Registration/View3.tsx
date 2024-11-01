import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox, Grid2, Paper, Typography } from "@mui/material";
import FormikAutocomplete from "./components/FormikAutocomplete";
import FormikDatePicker from "./components/FormikDatePicker";
import {
  cdlTypes,
  endorsements,
  referralSources,
  transmissions,
  workTypes,
} from "./enums/optionsLists";
import { pxContainer, viewTitleStyles } from "./enums/styles";
import { Grid } from "@mui/system";
import FormikTextField from "./components/FormikTextField";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface View3Props {}

const View3: React.FC<View3Props> = () => {
  return (
    <>
      <Typography variant="h6" sx={{ px: pxContainer, ...viewTitleStyles }}>
        Additional Details
      </Typography>
      <Typography variant="body2" sx={{ px: pxContainer }}>
        This is a description.
      </Typography>
      <Grid2 container spacing={2} sx={{ px: pxContainer }}>
        <Grid2 size={6}>
          <FormikAutocomplete
            name="transmission"
            options={transmissions}
            getOptionLabel={(option: { label: any }) => option.label}
            textFieldProps={{ label: "Choose your transmission" }}
          />
        </Grid2>

        <Grid2 size={6}>
          <FormikDatePicker
            name="cdlDate"
            label="When will you complete your training?"
          />
        </Grid2>
      </Grid2>
      <Paper variant="outlined" sx={{ width: "100%", padding: 2, mt: 4 }}>
        <Typography variant="h6" sx={viewTitleStyles}>
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
      <Grid container spacing={2} sx={{ px: pxContainer, mt: 4 }}>
        <Grid2 size={6}>
          <FormikTextField name="where" label="Where will you be training?" />
        </Grid2>
        <Grid2 size={6}>
          <FormikAutocomplete
            name="referralSource"
            options={referralSources}
            getOptionLabel={(option: { label: any }) => option.label}
            textFieldProps={{
              label: "How did you hear about us?",
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
      </Grid>
    </>
  );
};

export default View3;

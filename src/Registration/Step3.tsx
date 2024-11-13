import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Checkbox, Grid2, Paper, Typography } from "@mui/material";
import { Grid, Stack } from "@mui/system";
import FormikAutocomplete from "./components/FormikAutocomplete";
import FormikDatePicker from "./components/FormikDatePicker";
import FormikTextField from "./components/FormikTextField";
import {
  cdlTypes,
  referralSources,
  transmissions,
  workTypes,
} from "./utilities/optionsLists";
import { endorsements } from "./utilities/products";
import { pxContainer, titleStyles } from "./utilities/styles";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Step3Props {}

const Step3: React.FC<Step3Props> = () => {
  return (
    <>
      <Typography variant="h6" sx={{ px: pxContainer, ...titleStyles }}>
        Additional Details
      </Typography>

      <Stack
        direction="row"
        alignItems="flex-start"
        sx={{ py: 4, px: pxContainer }}
      >
        <Checkbox checked sx={{ alignSelf: "flex-start" }} />
        <Typography variant="body2">
          ELDT.com is connected with hundreds of trucking companies across
          America to help connect quality drivers with potential employment
          opportunities. To create the best experience, recruiters use text,
          phone, or email to communicate. If getting connected with employment
          opportunities is something that interests you, let us know by clicking
          the checkbox provided.
        </Typography>
      </Stack>
      <Grid2 container spacing={2} sx={{ px: pxContainer }}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormikAutocomplete
            name="transmission"
            options={transmissions}
            getOptionLabel={(option: { label: any }) => option.label}
            textFieldProps={{ label: "Choose your transmission" }}
          />
        </Grid2>

        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormikDatePicker
            name="cdlDate"
            label="When will you complete your training?"
          />
        </Grid2>
      </Grid2>
      <Paper variant="outlined" sx={{ width: "100%", padding: 2, mt: 4 }}>
        <Typography variant="h6">Once your training is complete...</Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
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
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <FormikAutocomplete
              name="endorsements"
              dependentAnswer="step1.endorsements"
              options={endorsements}
              getOptionLabel={(option) => option.title}
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
                    {option.title}
                  </li>
                );
              }}
            />
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
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
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <FormikTextField name="where" label="Where will you be training?" />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
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

export default Step3;

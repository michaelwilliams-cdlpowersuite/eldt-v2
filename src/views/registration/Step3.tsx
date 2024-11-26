import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid2,
  NativeSelect,
  Paper,
  Typography,
} from "@mui/material";
import { Box, Grid, Stack } from "@mui/system";
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
import { useField } from "formik";
import React, { useState } from "react";
import FormikSelectWithCheckmarks from "./components/FormikSelectWithCheckmarks";
import { DesktopOnly, MobileOnly } from "../../components/ResponsiveWrappers";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Step3Props {}

const Step3: React.FC<Step3Props> = () => {
  const [field] = useField("step3.optIn");
  const [stepField] = useField("step3");
  const [open, setOpen] = useState(false);

  return (
    <>
      <Typography variant="h6" sx={{ px: pxContainer, ...titleStyles }}>
        Additional Info
      </Typography>

      <Paper
        variant="outlined"
        sx={{ width: "100%", padding: 2, mt: 2, px: pxContainer }}
      >
        <Typography variant="h6">Training Details</Typography>
        <Stack>
          <FormControlLabel
            control={<Checkbox value={true} />}
            label="I prefer automatic trucks"
            name="step3.prefersAutomatic"
            onChange={stepField.onChange}
          />
          <Typography variant="caption">
            Check this box if you would prefer to train in an automatic vehicle.
            We recommend training in manual to have the most employment
            opportunities.
          </Typography>

          <FormikDatePicker
            sx={{ mt: 3 }}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            name="step3.cdlDate"
            label="When did you/will you complete your training?"
            views={["month", "year"]}
            format="MM-YYYY"
            textFieldProps={{
              onClick: () => setOpen(true),
            }}
          />
          <FormikTextField
            name="step3.where"
            label="Where will you be training?"
          />
        </Stack>
      </Paper>

      <Paper variant="outlined" sx={{ width: "100%", padding: 2, mt: 4 }}>
        <Typography variant="h6">Once your training is complete...</Typography>
        <Grid2 container spacing={2}>
          <MobileOnly>
            <Grid2 size={{ xs: 12 }}>
              <FormikSelectWithCheckmarks
                name="step3.cdlType"
                options={cdlTypes}
                getOptionValue={(option) => option.label}
                getOptionLabel={(option) => option.label}
                label="What type of CDL will you have?"
              />
            </Grid2>
          </MobileOnly>
          <DesktopOnly>
            <Grid2 size={{ xs: 12 }}>
              <FormikAutocomplete
                name="step3.cdlType"
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
          </DesktopOnly>
          <Grid2 size={{ xs: 12 }}>
            <FormikAutocomplete
              name="step3.endorsements"
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
          <Grid2 size={{ xs: 12 }}>
            <FormikAutocomplete
              name="step3.workType"
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

      <Paper variant="outlined" sx={{ width: "100%", padding: 2, mt: 4 }}>
        <Typography variant="h6">Thank you for choosing ELDT.com</Typography>
        <Grid container spacing={2}>
          <Grid2 size={{ xs: 12 }}>
            <FormikAutocomplete
              name="step3.referralSource"
              options={referralSources}
              getOptionLabel={(option: { label: any }) => option.label}
              textFieldProps={{
                label: "How did you hear about us?",
              }}
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
          <Grid2>
            <Typography>What type of work are you looking for?</Typography>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Connect me with employment opportunties please!"
              name="step3.optIn"
              onChange={stepField.onChange}
            />
            <Typography variant="caption" component="div">
              ELDT.com is connected with hundreds of trucking companies across
              America to help connect quality drivers with potential employment
              opportunities. To create the best experience, recruiters use text,
              phone, or email to communicate. If getting connected with
              employment opportunities is something that interests you, let us
              know by clicking the checkbox provided.
            </Typography>
          </Grid2>
        </Grid>
      </Paper>
    </>
  );
};

export default Step3;

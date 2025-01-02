import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import {Checkbox, FormControlLabel, Grid2, Paper, Typography,} from "@mui/material";
import {Grid} from "@mui/system";
import {useField} from "formik";
import React, {useState} from "react";
import {DesktopOnly, MobileOnly} from "../../components/ResponsiveWrappers";
import FormikAutocomplete from "./components/FormikAutocomplete";
import FormikSelectWithCheckmarks from "./components/FormikSelectWithCheckmarks";
import {workTypes} from "./utilities/optionsLists";
import {pxContainer, titleStyles} from "./utilities/styles";
import {useMe} from "../../hooks/useMe";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Step3Props {}

const Step3: React.FC<Step3Props> = () => {
  const [field] = useField("step3.optIn");
  const [stepField] = useField("step3");
  const [open, setOpen] = useState(false);
  const {data} = useMe();


  const referralSourcesOptions = data?.student?.customAttributes[1]?.config?.options?.map(({ label, value }) => ({
    label,
    value
  })) || [];

  const referralSourcesLabel = data?.student?.customAttributes[1]?.attributeName || 'How did you hear about us?';

  return (
    <>
      <Typography variant="h6" sx={{ px: pxContainer, ...titleStyles }}>
        Additional Info
      </Typography>
      <Paper variant="outlined" sx={{ width: "100%", padding: 2, mt: 4 }}>
        <Typography variant="h6">Recruitment</Typography>
        <Grid2 container spacing={2}>
          <MobileOnly key="worktype-mobile">
            <Grid2 size={{ xs: 12 }}>
              <FormikSelectWithCheckmarks
                name="step3.workType"
                options={workTypes}
                getOptionValue={(option) => option.label}
                getOptionLabel={(option) => option.label}
                label="What type of work are you looking for?"
                multiple
              />
            </Grid2>
          </MobileOnly>
          <DesktopOnly key="worktype-desktop">
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
          </DesktopOnly>
        </Grid2>
        <Grid2 sx={{mt: {xs: 2} }}>
          <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Connect me with employment opportunties please!"
              name="step3.optIn"
              onChange={stepField.onChange}
              sx={{
                alignItems: "flex-start",
                "& .MuiTypography-root": {
                  mt: "10px",
                },
              }}
          />
          <Typography variant="caption" component="div" sx={{mt: 2}}>
            ELDT.com is connected with hundreds of trucking companies across
            America to help connect quality drivers with potential employment
            opportunities. To create the best experience, recruiters use text,
            phone, or email to communicate. If getting connected with
            employment opportunities is something that interests you, let us
            know by clicking the checkbox provided.
          </Typography>
        </Grid2>
      </Paper>
      <Paper variant="outlined" sx={{ width: "100%", padding: 2, mt: 4 }}>
        <Typography variant="h6">Thank you for choosing ELDT.com</Typography>
        <Grid container spacing={2}>
          <MobileOnly key="referralSource-mobile">
            <Grid2 size={{ xs: 12 }}>
              <FormikSelectWithCheckmarks
                name="step3.referralSource"
                options={referralSourcesOptions}
                getOptionValue={(option) => option.label}
                getOptionLabel={(option) => option.label}
                label={referralSourcesLabel}
              />
            </Grid2>
          </MobileOnly>
          <DesktopOnly key="referralSource-desktop">
            <Grid2 size={{ xs: 12 }}>
              <FormikAutocomplete
                name="step3.referralSource"
                options={referralSourcesOptions}
                getOptionLabel={(option: { label: any }) => option.label}
                textFieldProps={{
                  label: referralSourcesLabel,
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
          </DesktopOnly>
        </Grid>
      </Paper>
    </>
  );
};

export default Step3;

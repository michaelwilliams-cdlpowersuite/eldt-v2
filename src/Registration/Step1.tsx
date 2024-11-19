import { Alert, Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormikContext } from "formik";
import { brandColors } from "../styles/brandColors";
import { CourseCard, EndorsementCard } from "./components/ProductCards";
import { useSelectCourse } from "../hooks/useSelectCourse";
import { useSelectEndorsement } from "../hooks/useSelectEndorsement";
import {
  Course,
  courses,
  Endorsement,
  endorsements,
} from "./utilities/products";
import { pxContainer, titleStyles } from "./utilities/styles";

interface Step1Props {}

const Step1: React.FC<Step1Props> = () => {
  const { values, errors, touched } = useFormikContext<{
    step1: { selectedCourse: string; selectedEndorsements: string[] };
  }>();

  const selectCourse = useSelectCourse();
  const selectEndorsement = useSelectEndorsement();

  const handleSelectCourse = (id: Course["id"]) => {
    selectCourse(id);
  };

  const handleSelectEndorsement = (id: Endorsement["id"]) => {
    selectEndorsement(id);
  };

  return (
    <Box sx={{ px: pxContainer }}>
      <Typography
        variant="h6"
        sx={{
          color:
            touched.step1?.selectedCourse && errors.step1?.selectedCourse
              ? brandColors.cdlRed
              : "inherit",
          ...titleStyles,
        }}
      >
        Choose your CDL Class
        {errors.step1 && !values.step1?.selectedCourse && (
          <Alert severity="error">{errors.step1 as string}</Alert>
        )}
      </Typography>
      {touched.step1?.selectedCourse && errors.step1?.selectedCourse && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {errors.step1.selectedCourse}
        </Typography>
      )}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {courses.map((course, index) => (
          <Grid size={{ xs: 12, sm: 4 }} key={index}>
            <CourseCard
              course={course}
              selected={values.step1.selectedCourse === course.id}
              onSelect={() => handleSelectCourse(course.id)}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" sx={{ my: 2, ...titleStyles }}>
        Choose your Endorsements
      </Typography>
      <Grid container spacing={2}>
        {endorsements.map((endorsement, index) => (
          <Grid size={{ xs: 12, sm: 4 }} key={index}>
            <EndorsementCard
              endorsement={endorsement}
              selected={values.step1.selectedEndorsements.includes(
                endorsement.id
              )}
              onSelect={() => handleSelectEndorsement(endorsement.id)}
            />
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2}></Stack>
    </Box>
  );
};

export default Step1;

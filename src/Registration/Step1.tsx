import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useFormikContext } from "formik";
import { brandColors } from "../styles/brandColors";
import { CourseCard, EndorsementCard } from "./components/ProductCards";
import {
  Course,
  courses,
  Endorsement,
  endorsements,
} from "./utilities/products";
import { pxContainer, titleStyles } from "./utilities/styles";

interface Step1Props {}

const Step1: React.FC<Step1Props> = () => {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    validateField,
  } = useFormikContext<{
    step1: { selectedCourse: string; selectedEndorsements: string[] };
  }>();

  const handleSelectCourse = (id: Course["id"]) => {
    const newValue = values.step1.selectedCourse === id ? "" : id;

    // Set the selected course without forcing touched
    setFieldValue("step1.selectedCourse", newValue).then(() => {
      // Validate immediately after setting the new value
      validateField("step1.selectedCourse");
    });

    // Show the error message if the user deselects the course
    if (values.step1.selectedCourse !== id) {
      setFieldTouched("step1.selectedCourse", true);
    }
  };

  const handleSelectEndorsement = (id: Endorsement["id"]) => {
    const newSelections = values.step1.selectedEndorsements.includes(id)
      ? values.step1.selectedEndorsements.filter(
          (selectedId) => selectedId !== id
        )
      : [...values.step1.selectedEndorsements, id];
    setFieldValue("step1.selectedEndorsements", newSelections);
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
        Add Endorsements
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

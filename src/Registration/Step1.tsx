import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CourseCard, EndorsementCard } from "./components/ProductCards";
import { Course, courses, Endorsement, endorsements } from "./enums/products";
import { pxContainer, viewTitleStyles } from "./enums/styles";
import { useFormikContext } from "formik";

interface Step1Props {}

const Step1: React.FC<Step1Props> = () => {
  const { values, setFieldValue } = useFormikContext<{
    step1: { selectedCourse: string; selectedEndorsements: string[] };
  }>();

  const handleSelectCourse = (id: Course["id"]) => {
    setFieldValue("step1.selectedCourse", id);
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
      <Typography variant="h6" sx={viewTitleStyles}>
        Choose your CDL Class
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {courses.map((course, index) => (
          <Grid size={4} key={index}>
            <CourseCard
              course={course}
              selected={values.step1.selectedCourse === course.id}
              onSelect={() => handleSelectCourse(course.id)}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h6" sx={{ my: 2, ...viewTitleStyles }}>
        Add Endorsements
      </Typography>
      <Grid container spacing={2}>
        {endorsements.map((endorsement, index) => (
          <Grid size={4} key={index}>
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

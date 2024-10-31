import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { pxContainer, viewTitleStyles } from "./enums/styles";

interface View1Props {}

const View1: React.FC<View1Props> = () => {
  return (
    <Box sx={{ px: pxContainer }}>
      <Typography variant="h5" sx={viewTitleStyles}>
        Choose your CDL Class
      </Typography>
      <Grid container spacing={2}>
        {classes.map((c, index) => (
          <Grid size={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" textAlign="center">
                  {c.title}
                </Typography>
                <Typography variant="body1" textAlign="center">
                  {c.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" sx={viewTitleStyles}>
        Add Endorsements
      </Typography>
      <Grid container spacing={2}>
        {endorsements.map((e, index) => (
          <Grid size={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" textAlign="center">
                  {e.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2}></Stack>
    </Box>
  );
};

export default View1;

const classes = [
  { title: "Class B CDL Training", description: "Single Vehicle" },
  { title: "Class A CDL Training", description: "Combination Vehicle" },
  { title: "Class B-A CDL Training", description: "Comination Vehicle" },
];

const endorsements = [
  { title: "Hazmat" },
  { title: "Passenger" },
  { title: "School Bus" },
];

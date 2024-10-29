import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface SelectClassProps {}

const SelectClass: React.FC<SelectClassProps> = () => {
  return (
    <Box>
      <Typography variant="h4" textAlign="center">
        Select Class
      </Typography>
      <Grid container spacing={2}>
        {classes.map((c) => (
          <Grid size={4}>
            <Card>
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
      <Typography variant="h4" textAlign="center">
        Select Endorsement
      </Typography>
      <Grid container spacing={2}>
        {endorsements.map((e) => (
          <Grid size={4}>
            <Card>
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

export default SelectClass;

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

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  Typography,
} from "@mui/material";
import { Course, Endorsement } from "../enums/products";
import { Stack } from "@mui/system";

interface CourseCardProps {
  course: Course;
  selected: boolean;
  onSelect: () => void;
}

// These are CDL Classes
export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  selected,
  onSelect,
}) => {
  return (
    <Card
      variant="outlined"
      onClick={onSelect}
      sx={{ border: selected ? "primary.main" : "" }}
    >
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Checkbox checked={selected} onChange={onSelect} />
          </Box>
          <Typography variant="h6" textAlign="center">
            {course.title}
          </Typography>
          <Typography variant="body1" textAlign="center">
            {course.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

interface EndorsementCardProps {
  endorsement: Endorsement;
  selected: boolean;
  onSelect: () => void;
}

export const EndorsementCard: React.FC<EndorsementCardProps> = ({
  endorsement,
  selected,
  onSelect,
}) => {
  return (
    <Card
      variant="outlined"
      onClick={onSelect}
      sx={{ border: selected ? "2px solid primary.main" : "" }}
    >
      <CardActionArea>
        <CardContent>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="start"
          >
            <Checkbox checked={selected} onChange={onSelect} />
            <Typography variant="h6" textAlign="center">
              {endorsement.title}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Course, Endorsement } from "../enums/products";

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
      sx={{ border: selected ? "2px solid blue" : "" }}
    >
      <CardActionArea>
        <CardContent>
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
      sx={{ border: selected ? "2px solid green" : "" }}
    >
      <CardContent>
        <Typography variant="h6" textAlign="center">
          {endorsement.title}
        </Typography>
      </CardContent>
    </Card>
  );
};

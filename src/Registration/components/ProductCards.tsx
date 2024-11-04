import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  Typography,
} from "@mui/material";
import { Course, Endorsement } from "../enums/products";
import { maxWidth, Stack } from "@mui/system";

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pb: 2,
            }}
          >
            {course.icon && <course.icon style={{ maxHeight: "70" }} />}
          </Box>

          <Typography variant="h6" textAlign="center">
            {course.title}
          </Typography>
          <Typography variant="body1" textAlign="center">
            {course.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Checkbox checked={selected} onChange={onSelect} />
        </Box>
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
            {endorsement.icon && (
              <endorsement.icon
                style={
                  endorsement.iconStyles || {
                    maxHeight: "23px",
                    maxWidth: "50px",
                  }
                }
              />
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

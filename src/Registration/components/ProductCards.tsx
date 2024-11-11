import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { Course, Endorsement, ProductType } from "../utilities/products";
import React from "react";

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
              pt: { xs: 2, sm: 0 },
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
            sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}
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

interface ProductTypeCardProps {
  productType: ProductType;
}

export const ProductTypeCard: React.FC<ProductTypeCardProps> = ({
  productType,
}) => {
  return (
    <Card variant="outlined">
      <CardActionArea>
        <CardContent>
          <Typography variant="h6" textAlign="center">
            {productType.title}
          </Typography>
          <Typography variant="h3" textAlign="center">
            ${productType.price}
          </Typography>
          <Typography variant="body1" textAlign="center">
            {productType.description}
          </Typography>
          <List>
            {productType.benefits?.map((benefit, index) => (
              <React.Fragment key={index}>
                <Divider />
                <ListItem key={index}>
                  {benefit.icon && (
                    <ListItemIcon>
                      <benefit.icon
                        style={{ maxHeight: "23px", maxWidth: "50px" }}
                      />
                    </ListItemIcon>
                  )}
                  <Typography variant="body1">{benefit.title}</Typography>
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

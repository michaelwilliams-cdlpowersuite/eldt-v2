import {
  Box,
  Button,
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
import React from "react";
import { Course, Endorsement, Product } from "../utilities/products";
import { brandColors } from "../../../styles/brandColors";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

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
  showPrice?: boolean;
}

export const EndorsementCard: React.FC<EndorsementCardProps> = ({
  endorsement,
  selected,
  onSelect,
  showPrice = false,
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
            sx={{ justifyContent: { xs: "center", sm: "space-between" } }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                gap: 2,
                minWidth: "230px",
              }}
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
            </Box>
            {showPrice && (
              <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                ${endorsement.price}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

interface ProductTypeCardProps {
  product: Product;
  selected: boolean;
  onSelect: () => void;
}

export const ProductTypeCard: React.FC<ProductTypeCardProps> = ({
  product,
  onSelect,
  selected,
}) => {
  return (
    <Card
      variant="outlined"
      onClick={onSelect}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",

        // border: selected ? "primary.main" : brandColors.cdlDarkBlue,
      }}
    >
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", height: "100%", pb: 2 }}
        component="div"
      >
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div>
            <Typography variant="h6" textAlign="center">
              {product.title}
            </Typography>
            <Typography variant="h3" textAlign="center">
              ${product.price}
            </Typography>
          </div>

          <Typography
            variant="body1"
            textAlign="center"
            sx={{
              display: "flex",
              textAlign: "center",
              minHeight: "130px",
              py: 2,
            }}
          >
            {product.description}
          </Typography>

          <List>
            {product.benefits?.map((benefit, index) => (
              <React.Fragment key={index}>
                <Divider />
                <ListItem>
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
        <Button
          variant="contained"
          color={selected ? "error" : "secondary"}
          size="medium"
          sx={{ fontWeight: "bold" }}
          startIcon={
            selected ? <RemoveShoppingCartIcon /> : <ShoppingCartIcon />
          }
        >
          {selected ? "Remove from Cart" : "Add to Cart"}
        </Button>
      </CardActionArea>
    </Card>
  );
};

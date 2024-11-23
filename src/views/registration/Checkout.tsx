import { Alert, Container, Grid2, Toolbar, Typography } from "@mui/material";
import {Box, Button} from "@mui/material";
import { useField } from "formik";
import OrderSummary from "./components/OrderSummary";
import { EndorsementCard, ProductTypeCard } from "./components/ProductCards";
import RefundPolicy from "./components/RefundPolicy";
import { useSelectCourseType } from "./hooks/useSelectCourseType";
import { useSelectEndorsement } from "./hooks/useSelectEndorsement";
import {
  CourseType,
  courseTypes,
  Endorsement,
  endorsements,
  getCourseById,
  getEndorsementsByIds,
} from "./utilities/products";
import { pxContainer } from "./utilities/styles";
import {brandColors} from "../../styles/brandColors";
import {useNavigate} from "react-router-dom";

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
  const navigate = useNavigate();
  const [selectedCourseField] = useField("step1.selectedCourse");
  const [selectedEndorsementsField] = useField("step1.selectedEndorsements");
  const [selectedCourseType, selectedCourseTypeMeta] = useField(
    "step4.selectedCourseType"
  );

  const selectedCourse = getCourseById(selectedCourseField.value);
  const selectedEndorsements = getEndorsementsByIds(
    selectedEndorsementsField.value
  );
  const selectEndorsement = useSelectEndorsement();
  const selectCourseType = useSelectCourseType();

  const handleSelectEndorsement = (id: Endorsement["id"]) => {
    selectEndorsement(id);
  };

  const handleSelectCourseType = (courseType: CourseType) => {
    selectCourseType(courseType);
  };

  return (
    <Container sx={{ px: pxContainer, pb: 4 }}>
      <Toolbar />
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Select Theory Type
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Select FCMSA Approved Training for {selectedCourse?.type}
      </Typography>
      {selectedCourseTypeMeta.error && (
        <Alert severity="error">{selectedCourseTypeMeta.error as string}</Alert>
      )}
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        {courseTypes.map((courseType, index) => (
          <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
            <ProductTypeCard
              key={courseType.id}
              productType={courseType}
              selected={selectedCourseType?.value?.id === courseType.id}
              onSelect={() => handleSelectCourseType(courseType)}
            />
          </Grid2>
        ))}
      </Grid2>
      <Typography variant="h6" sx={{ mb: 2, pt: 2 }}>
        Add Endorsements
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        By adding endorsements you can maximaize your pay! If you're looking to get your Class A CDL then we
        recommend HAZ to increase your salary by 25% on average
      </Typography>
      <Grid2 container spacing={1}>
        {endorsements.map((endorsement, index) => (
          <Grid2 size={{ xs: 12, sm: 12 }} key={index}>
            <EndorsementCard
              endorsement={endorsement}
              selected={selectedEndorsementsField.value.includes(
                endorsement.id
              )}
              onSelect={() => handleSelectEndorsement(endorsement.id)}
              showPrice
            />
          </Grid2>
        ))}
      </Grid2>
      <RefundPolicy />
      <OrderSummary />
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          onClick={() => { navigate('/register/payment') }}
          variant="contained"
          disableElevation
          sx={{
              mr: 1,
              backgroundColor: brandColors.goGreen,
              color: "#fff",
              "&:hover": { backgroundColor: brandColors.goGreenHover },
          }}
        >
            Proceed to Payment
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;

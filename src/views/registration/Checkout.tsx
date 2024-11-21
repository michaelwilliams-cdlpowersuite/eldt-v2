import { Container, Grid2, Toolbar, Typography } from "@mui/material";
import { useField } from "formik";
import OrderSummary from "./components/OrderSummary";
import { EndorsementCard, ProductTypeCard } from "./components/ProductCards";
import RefundPolicy from "./components/RefundPolicy";
import { useSelectCourseType } from "./hooks/useSelectCourseType";
import { useSelectEndorsement } from "./hooks/useSelectEndorsement";
import {
  courseTypes,
  Endorsement,
  endorsements,
  getCourseById,
  getEndorsementsByIds,
} from "./utilities/products";
import { pxContainer } from "./utilities/styles";

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
  const [selectedCourseField] = useField("step1.selectedCourse");
  const [selectedEndorsementsField] = useField("step1.selectedEndorsements");
  const [selectedCourseType] = useField("step4.selectedCourseType");
  const selectedCourse = getCourseById(selectedCourseField.value);
  const selectedEndorsements = getEndorsementsByIds(
    selectedEndorsementsField.value
  );
  const selectEndorsement = useSelectEndorsement();
  const selectCourseType = useSelectCourseType();

  const handleSelectEndorsement = (id: Endorsement["id"]) => {
    selectEndorsement(id);
  };

  const handleSelectCourseType = (id: string) => {
    selectCourseType(id);
  };

  return (
    <Container sx={{ px: pxContainer, pb: 4 }}>
      <Toolbar />
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Checkout
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Select FCMSA Approved Training for {selectedCourse?.type}
      </Typography>
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        {courseTypes.map((courseType, index) => (
          <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
            <ProductTypeCard
              key={courseType.id}
              productType={courseType}
              selected={selectedCourseType.value === courseType.id}
              onSelect={() => handleSelectCourseType(courseType.id)}
            />
          </Grid2>
        ))}
      </Grid2>
      <Typography variant="body1" sx={{ mb: 2, pt: 2 }}>
        Add Endorsements
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
      <OrderSummary
        selectedCourse={selectedCourse}
        selectedCourseType={selectedCourseType}
        selectedEndorsements={selectedEndorsements}
      />
    </Container>
  );
};

export default Checkout;

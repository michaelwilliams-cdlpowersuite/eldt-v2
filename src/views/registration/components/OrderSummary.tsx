import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import { useMemo } from "react";
import { Endorsement, getEndorsementsByIds } from "../utilities/products";

interface OrderSummaryProps {}

const OrderSummary: React.FC<OrderSummaryProps> = () => {
  const [selectedCourses] = useField("step1.selectedCourse");
  const [selectedEndorsementsField] = useField("step1.selectedEndorsements");
  const [selectedCourseType] = useField("step4.selectedCourseType");
  const selectedEndorsements = getEndorsementsByIds(
    selectedEndorsementsField.value
  );

  console.log(selectedCourseType);
  const calculatedSubtotal = useMemo(() => {
    let subtotal = 0;
    if (selectedCourseType?.value?.price) {
      subtotal += selectedCourseType?.value?.price;
    }
    selectedEndorsements.forEach((endorsement: Endorsement) => {
      subtotal += endorsement?.price || 0;
    });
    return subtotal;
  }, [selectedCourseType, selectedEndorsements]);

  return (
    <Grid2 container sx={{ pt: 2 }}>
      <Grid2 size={12}>
        <Card elevation={0} variant="outlined">
          <CardHeader title="Order Summary" />
          <CardContent>
            <Typography variant="body1">
              FCMSA Approved Training - I'm here!
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">{calculatedSubtotal}</Typography>
            </Stack>
            <Typography variant="body1">Processing Fee</Typography>
            <Typography variant="body1">Tax</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" fontWeight="bold">
              Total
            </Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default OrderSummary;

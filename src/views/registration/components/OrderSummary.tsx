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

  const calculatedProcessingFee = useMemo(() => {
    return calculatedSubtotal * 0.0385;
  }, [calculatedSubtotal]);

  const calculatedTotal = useMemo(() => {
    return calculatedSubtotal + calculatedProcessingFee;
  }, [calculatedSubtotal, calculatedProcessingFee]);

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
              <Typography variant="body1">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(calculatedSubtotal)}
              </Typography>
            </Stack>
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="body1">Processing Fee</Typography>
              <Typography variant="body1">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(calculatedProcessingFee)}
              </Typography>
            </Stack>

            <Divider sx={{ my: 1 }} />
            <Stack justifyContent="space-between" direction="row">
              <Typography variant="body1" fontWeight="bold">
                Total
              </Typography>
              <Typography variant="body1">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(calculatedTotal)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default OrderSummary;

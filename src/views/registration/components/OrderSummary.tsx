import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";

interface OrderSummaryProps {}

const OrderSummary: React.FC<OrderSummaryProps> = () => {
  return (
    <Grid2 container sx={{ pt: 2 }}>
      <Grid2 size={12}>
        <Card elevation={0} variant="outlined">
          <CardHeader title="Order Summary" />
          <CardContent>
            <Typography variant="body1">FCMSA Approved Training - I'm here!</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1">Subtotal</Typography>
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

import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import SignatureCanvas from "react-signature-canvas";

interface OrderSummaryProps {}

const OrderSummary: React.FC<OrderSummaryProps> = () => {
  return (
    <Grid2 container sx={{ pt: 2 }}>
      <Grid2 size={12}>
        <Card elevation={0} variant="outlined">
          <CardHeader title="Refund Policy" />
          <CardContent>
            <Typography variant="body1"><strong>By signing below, you are agreeing to ELDT's current refund policy.</strong></Typography>
            <Typography variant="body1">
              <br />All sales of ELDT online lessons are final once the purchase is submitted and payment is processed. For additional information, please contact us at info@eldt.com or call us at (509) 241-3987.
            </Typography>
            <SignatureCanvas canvasProps={{width: 400, height: 100, className: 'sigCanvas'}} /> *
            <Typography>* Please sign above</Typography>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default OrderSummary;

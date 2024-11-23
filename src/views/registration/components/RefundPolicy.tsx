import {
  Alert,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid2,
  Typography,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { brandColors } from "../../../styles/brandColors";

interface RefundPolicyProps {}

const RefundPolicy: React.FC<RefundPolicyProps> = () => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);
  const [field, meta] = useField("step4.signature");
  const { setFieldValue, setFieldTouched, validateField } = useFormikContext();

  const handleSignatureEnd = () => {
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.toDataURL();
      setFieldTouched("step4.signature", true);
      setFieldValue("step4.signature", signatureData);
    }
  };

  const handleClearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      setFieldValue("step4.signature", null);
      validateField("step4.signature");
    }
  };

  return (
    <Grid2 container sx={{ pt: 2 }}>
      <Grid2 size={12}>
        <Card
          elevation={0}
          variant="outlined"
          sx={{
            borderColor:
              meta.touched && meta.error
                ? brandColors.cdlRed
                : "rgba(0, 0, 0, 0.12)",
            borderWidth: 2,
          }}
        >
          <CardHeader title="Refund Policy" />
          {meta.error && <Alert severity="error">{meta.error as string}</Alert>}
          <CardContent>
            <Typography variant="body1">
              <strong>
                By signing below, you are agreeing to ELDT's current refund
                policy.
              </strong>
            </Typography>
            <Typography variant="body1">
              <br />
              All sales of ELDT online lessons are final once the purchase is
              submitted and payment is processed. For additional information,
              please contact us at info@eldt.com or call us at (509) 241-3987.
            </Typography>
            <SignatureCanvas
              ref={sigCanvas}
              canvasProps={{ width: 400, height: 100, className: "sigCanvas" }}
              backgroundColor="#f5f5f5"
              onEnd={handleSignatureEnd}
            />
            *<Typography>* Please sign above</Typography>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClearSignature}
              sx={{ mt: 2 }}
            >
              Reset Signature
            </Button>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
};

export default RefundPolicy;

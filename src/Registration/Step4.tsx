import { Container, Grid2, Typography } from "@mui/material";
import { ProductTypeCard } from "./components/ProductCards";
import { productTypes } from "./utilities/products";
import { pxContainer } from "./utilities/styles";

interface Step4Props {}

const Step4: React.FC<Step4Props> = () => {
  return (
    <Container sx={{ px: pxContainer }}>
      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
        Checkout
      </Typography>

      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        {productTypes.map((productType, index) => (
          <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
            <ProductTypeCard key={productType.id} productType={productType} />
          </Grid2>
        ))}
      </Grid2>

      {/* <CheckoutForm /> */}
    </Container>
  );
};

export default Step4;

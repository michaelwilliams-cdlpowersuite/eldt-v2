import { Alert, Container, Grid2, Toolbar, Typography } from "@mui/material";
import {Box, Button} from "@mui/material";
import {useField, useFormikContext} from "formik";
import OrderSummary from "./components/OrderSummary";
import { EndorsementCard, ProductTypeCard } from "./components/ProductCards";
import RefundPolicy from "./components/RefundPolicy";
import {
  Endorsement,
  endorsements,
  getCourseById,
  getEndorsementsByIds, Product, products,
} from "./utilities/products";
import { pxContainer } from "./utilities/styles";
import {brandColors} from "../../styles/brandColors";
import {useNavigate} from "react-router-dom";
import {CartItem, RegistrationFormUIValues} from "./utilities/validationSchema";
import {useCallback, useEffect, useMemo, useState} from "react";
import useValidateCurrentStep from "./hooks/useValidateCurrentStep";
import {closeSnackbar, enqueueSnackbar} from "notistack";
import {snackOptions} from "./utilities/snackOptions";

interface CheckoutProps {}

const Checkout: React.FC<CheckoutProps> = () => {
  const [selectedClassProductType, setSelectedClassProductType] = useState('master');
  const navigate = useNavigate();
  const [selectedCourseField, selectedCourseTypeMeta] = useField("step1.selectedCourse");
  const [selectedEndorsementsField] = useField("step1.selectedEndorsements");
  const [cartItems, cartItemsMeta, cartItemHelpers] = useField("cart.items");
  const { setFieldValue, setFieldTouched, validateField } = useFormikContext<RegistrationFormUIValues>();
  const {setValue: setCartItems} = cartItemHelpers;

  const selectedCourse = getCourseById(selectedCourseField.value);
  const selectedEndorsements = getEndorsementsByIds(selectedEndorsementsField.value);

  // set initial cart items based on students selected values in previous steps (or from saved DB record)
  useEffect(() => {
    const cartItems: CartItem[] = [];
    const selectedProduct = products.find((p) => p.type == 'master');

    if (selectedProduct && selectedCourse) {
      cartItems.push({sku: selectedProduct.skuMap[selectedCourse.type], price: selectedProduct.price });
    }

    selectedEndorsements.forEach((e) => {
      cartItems.push({sku: e.sku, price: e.price});
    })

    setCartItems(cartItems);
  }, []);

  const validateCurrentStep = useValidateCurrentStep();
  const proceedToPayment = async () => {
    const isValid = await validateCurrentStep('cart');

    if (isValid) {
      closeSnackbar();

      navigate('/register/payment');
    } else {
      // step was not valid
      enqueueSnackbar(
        "Please sign the refund agreement",
        snackOptions("error")
      );
    }
  }

  const toggleEndorsementCartItem = (item: Endorsement) => {
    const sku = item.sku;
    const inCart = cartItems.value.find((ci: CartItem) => ci.sku === sku) != null;
    const newCartItems = cartItems.value.filter((ci: CartItem) => ci.sku != item.sku); // get all items that are not what we're trying to toggle

    if (!inCart) {
      newCartItems.push({sku: item.sku, price: item.price});
    }

    setCartItems(newCartItems);
  };

  const toggleProductCartItem = (product: Product) => {
    // type safety only, should not be the case
    if (!selectedCourse) {
      return;
    }

    const selectProductType = product.type;
    const otherProductType = selectProductType === 'master' ? 'reading' : 'master';
    const otherProduct = products.find((p) => p.type == otherProductType);

    const productSku = product.skuMap[selectedCourse.type];
    const otherProductSku = otherProduct?.skuMap[selectedCourse.type];

    const inCart = cartItems.value.find((ci: CartItem) => ci.sku === productSku) != null;

    const newCartItems = cartItems.value.filter((ci: CartItem) => ci.sku != productSku && ci.sku != otherProductSku);
    if (!inCart) {
      newCartItems.push({sku: productSku, price: product.price });
      setSelectedClassProductType(selectProductType);
    } else {
      setSelectedClassProductType('');
    }

    setCartItems(newCartItems);
  }

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
        {products.map((product, index) => (
          <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
            <ProductTypeCard
              key={product.type}
              product={product}
              selected={!!cartItems.value.find((e: CartItem) => product.type === selectedClassProductType)}
              onSelect={() => toggleProductCartItem(product)}
            />
          </Grid2>
        ))}
      </Grid2>
      <Typography variant="h6" sx={{ mb: 2, pt: 2 }}>
        Add Endorsements
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        By adding endorsements you can maximize your pay! If you're looking to get your Class A CDL then we
        recommend HAZ to increase your salary by 25% on average
      </Typography>
      <Grid2 container spacing={1}>
        {endorsements.map((endorsement, index) => (
          <Grid2 size={{ xs: 12, sm: 12 }} key={index}>
            <EndorsementCard
              endorsement={endorsement}
              selected={!!cartItems.value.find((e: CartItem) => endorsement.sku === e.sku)}
              onSelect={() => toggleEndorsementCartItem(endorsement)}
              showPrice
            />
          </Grid2>
        ))}
      </Grid2>
      <RefundPolicy />
      <OrderSummary />
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          onClick={() => proceedToPayment()}
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

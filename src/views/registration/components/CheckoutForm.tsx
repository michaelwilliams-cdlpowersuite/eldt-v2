import {EmbeddedCheckout, EmbeddedCheckoutProvider} from "@stripe/react-stripe-js";
import React, {useCallback, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {useField} from "formik";
import {CartItem} from "../utilities/validationSchema";
import {createCheckoutSession} from "../../../api/ecommerenceApi";
import {Navigate, useNavigate} from "react-router-dom";
import {prepareHandoff} from "../../../api/api";

// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51KVilWEqooDHZwmck4VuUymwm3Bw75Fuyryrd0o3MiIlhowWiYpgJg0RgyrNIKufGU4lwTGYZxoIcsSSgP2ZaDmJ00Lb7M2O9G");

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [cart] = useField("cart");

    const fetchClientSecret = useCallback(async () => {
        const response = await createCheckoutSession(cart.value.items, cart.value.signature);

        return response.clientSecret;
    }, []);

    const navigate = useNavigate();
    if (!cart.value.items.length) {
        return <Navigate to="/register/checkout" />
    }

    const handleAuthRedirect = async () => {
        await prepareHandoff()

        // @ts-ignore
        window.location = 'https://dev.eldt.com/eldt-handoff';
    };

    const onComplete = () => {
        setIsComplete(true)
        handleAuthRedirect();
    }

    const options = {
        fetchClientSecret,
        onComplete
    };

    return isComplete ? (
        <p>Payment completed. Processing your order...</p>
    ) : (
        <>
            <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={options}>
                <EmbeddedCheckout/>
            </EmbeddedCheckoutProvider>
        </>
    );
};

export default CheckoutForm;

import {EmbeddedCheckout, EmbeddedCheckoutProvider} from "@stripe/react-stripe-js";
import React, {useCallback, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {useField} from "formik";
import {CartItem} from "../utilities/validationSchema";
import {createCheckoutSession} from "../../../api/ecommerenceApi";
import {Navigate, useNavigate} from "react-router-dom";
import {prepareHandoff} from "../../../api/api";
import config from "../../../config";
import FullpageLoader from "../../../components/FullpageLoader";

// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(config.stripePublicKey);

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [isComplete, setIsComplete] = useState(true);
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

        window.location.replace(config.angularClientUrl+'/eldt-handoff');
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
        <FullpageLoader loadingText="Processing your order..."/>
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

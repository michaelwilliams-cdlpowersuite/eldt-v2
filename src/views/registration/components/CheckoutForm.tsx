import {EmbeddedCheckout, EmbeddedCheckoutProvider, PaymentElement} from "@stripe/react-stripe-js";
import {useCallback, useState} from "react";
import {loadStripe} from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// This is your test secret API key.
const stripePromise = loadStripe("pk_test_51KVilWEqooDHZwmck4VuUymwm3Bw75Fuyryrd0o3MiIlhowWiYpgJg0RgyrNIKufGU4lwTGYZxoIcsSSgP2ZaDmJ00Lb7M2O9G");

const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const onComplete = () => {
        setIsComplete(true)
    }

    const fetchClientSecret = useCallback(() => {
        // Create a Checkout Session
        const token = localStorage.getItem("apiToken");
        return fetch("http://localhost:8001/api/eldt/checkout-session", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                products: [
                    {
                        sku: "class_a_theory",
                        quantity: 1
                    }
                ],
                signature: "test"
            }),
        })
        .then((res) => res.json())
        .then((data) => data.clientSecret);
    }, []);

    const options = {
        fetchClientSecret,
        onComplete
    };

    return isComplete ? (
        <p>Payment completed. Processing your reports...</p>
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

import React from 'react'
import {
    Stack,
    Typography,
} from '@mui/material'
import { useCallback } from "react";
import type { Step5Props } from '../types'
import config from "../../../config";
import { loadStripe } from "@stripe/stripe-js";
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider
} from "@stripe/react-stripe-js";

interface Step5PropsExtended extends Step5Props {
    createCheckoutSession: () => Promise<{ clientSecret: string }>;
    checkoutSessionMutation: any;
}

// Inner component that uses the Stripe hooks
const CheckoutForm: React.FC<Step5PropsExtended> = ({
    total,
    accountDetails,
    setAccountDetails,
    paymentMethod,
    setPaymentMethod,
    createCheckoutSession,
    checkoutSessionMutation,
}) => {
    const fetchClientSecret = useCallback(async () => {
        try {
            const response = await createCheckoutSession();
            return response.clientSecret;
        } catch (error) {
            console.error("Failed to create checkout session:", error);
            throw error;
        }
    }, [createCheckoutSession]);

    const onComplete = () => {
        // Handle completion
        console.log("Payment completed");
    };

    return (
        <Stack spacing={3}>
            <Typography variant="h6" color="text.primary">
                Complete your purchase to unlock your trucking career!
            </Typography>
            <EmbeddedCheckout />
        </Stack>
    );
};

// Main component that provides the Stripe context
export const Step5_Payment: React.FC<Step5PropsExtended> = (props) => {
    const stripePromise = config ? loadStripe(config.stripePublicKey) : null;

    const fetchClientSecret = useCallback(async () => {
        try {
            const response = await props.createCheckoutSession();
            return response.clientSecret;
        } catch (error) {
            console.error("Failed to create checkout session:", error);
            throw error;
        }
    }, [props.createCheckoutSession]);

    const onComplete = () => {
        // Handle completion
        console.log("Payment completed");
    };

    const options = {
        fetchClientSecret,
        onComplete,
    };

    return (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <CheckoutForm {...props} />
        </EmbeddedCheckoutProvider>
    );
};

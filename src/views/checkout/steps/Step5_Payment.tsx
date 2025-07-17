import React from 'react'
import {
    Stack,
    Typography,
    TextField,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Box,
} from '@mui/material'
import { useCallback } from "react";
import { UserPlus, CreditCard } from 'lucide-react'
import { SummaryLine } from '../components/SummaryLine'
import type { Step5Props } from '../types'
import config from "../../../config";
import { loadStripe } from "@stripe/stripe-js";
import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";

const Input = ({
    id,
    label,
    ...props
}: {
    id?: string
    label?: string
    [key: string]: any
}) => (
    <TextField
        id={id}
        label={label}
        fullWidth
        variant="outlined"
        color="success"
        {...props}
    />
)
export const Step5_Payment: React.FC<Step5Props> = ({
    total,
    accountDetails,
    setAccountDetails,
    paymentMethod,
    setPaymentMethod,
}) => {
    const stripePromise = config ? loadStripe(config.stripePublicKey) : null;

    const fetchClientSecret = useCallback(async () => {
        return 'cs_test_b1vBhmBHjKp9bqiyEcUj7KfBYXZRLbfp5a6hx8nLuUoFqJcSLxHUlg8LQc_secret_fidkdWxOYHwnPyd1blpxYHZxWjA0TlNsaVJAdGpqQU1fcmhmbjFTcFB8aHJoNkdyMjBDcHx3fHdhNWo2SGxMaW1qclJsXHViT2I1V2J8d0tMTnBjQlAxaXJRQlxffWpMZnZWVmJVN19kQWhPNTVJZzJIN0o8QicpJ3BsSGphYCc%2FJ2BoZ2BhYWBhJyknaWR8anBxUXx1YCc%2FJ2hwaXFsWmxxYGgnKSd3YGFsd2BmcUprRmpodWlgcWxqayc%2FJ2RpcmR8dicpJ2dkZm5id2pwa2FGamlqdyc%2FJyZjY2NjY2MneCUl';
        // const response = await createCheckoutSession(
        //     [{ price: 3, sku: "sms_communication" }],
        //     "cart.value.signature",
        // );
        // return response.clientSecret;
    }, []);

    const onComplete = () => {
        // setIsComplete(true);
    };

    const options = {
        fetchClientSecret,
        onComplete,
    };

    return (
        <Stack spacing={3}>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
                Create Your Account & Pay
            </Typography>
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </Stack>
    )
} 
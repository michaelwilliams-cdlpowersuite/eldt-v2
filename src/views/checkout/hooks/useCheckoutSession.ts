import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "../../../api/api";

export interface CheckoutSessionRequest {
    products: Array<{
        sku: string;
        quantity: number;
    }>;
}

export interface CheckoutSessionResponse {
    clientSecret: string;
    // Add other response fields as needed
}

export const useCheckoutSession = () => {
    return useMutation<CheckoutSessionResponse, Error, CheckoutSessionRequest>({
        mutationFn: (request: CheckoutSessionRequest) => createCheckoutSession(request.products),
        onError: (error) => {
            console.error("Failed to create checkout session:", error);
        },
    });
}; 
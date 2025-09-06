import { useQuery } from '@tanstack/react-query';
import apiClient from '../../../api/apiClient';

export interface CheckoutSessionData {
    sessionId: string;           // The Stripe checkout session ID
    email: string;              // Customer's email address from checkout
    requiresEmailVerification: boolean;    // Whether email verification is required
    requiresRegistrationCompletion: boolean; // Whether additional registration is needed
}

const fetchCheckoutSession = async (sessionId: string): Promise<CheckoutSessionData> => {
    const response = await apiClient.get(`/eldt/v2/checkout-sessions/${sessionId}`);
    return response.data;
};

export const useCheckoutSession = (sessionId: string | null) => {
    return useQuery({
        queryKey: ['checkout-session', sessionId],
        queryFn: () => fetchCheckoutSession(sessionId!),
        enabled: !!sessionId, // Only run query if sessionId exists
        retry: 2,
    });
};

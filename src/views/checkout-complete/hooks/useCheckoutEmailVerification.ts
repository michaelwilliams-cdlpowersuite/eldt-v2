import { useMutation } from '@tanstack/react-query';
import apiClient from '../../../api/apiClient';

interface VerifyEmailRequest {
    checkoutSessionId: string;
    token: string;
}

interface VerifyEmailResponse {
    accessToken: string;
    requiresRegistrationCompletion: boolean;
}

const verifyCheckoutEmail = async ({ checkoutSessionId, token }: VerifyEmailRequest): Promise<VerifyEmailResponse> => {
    const response = await apiClient.post(`/api/eldt/v2/checkout-sessions/${checkoutSessionId}/complete-purchase`, {
        token
    });
    return response.data;
};

export const useCheckoutEmailVerification = () => {
    return useMutation({
        mutationFn: verifyCheckoutEmail,
        onSuccess: (data) => {
            // Save the access token to localStorage
            if (data.accessToken) {
                localStorage.setItem('apiToken', data.accessToken);
            }
        },
        onError: (error) => {
            console.error('Failed to verify email:', error);
        }
    });
};

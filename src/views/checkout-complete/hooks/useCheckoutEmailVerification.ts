import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
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
    const response = await apiClient.post(`/eldt/v2/checkout-sessions/${checkoutSessionId}/complete-purchase`, {
        token
    });
    return response.data;
};

export const useCheckoutEmailVerification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: verifyCheckoutEmail,
        onSuccess: (data, variables) => {
            // Save the access token to localStorage
            if (data.accessToken) {
                localStorage.setItem('apiToken', data.accessToken);
            }

            // Invalidate relevant queries after successful verification
            queryClient.invalidateQueries({
                queryKey: ['checkout-session', variables.checkoutSessionId]
            });

            // Also invalidate user data queries if they exist
            queryClient.invalidateQueries({
                queryKey: ['me']
            });

            // Show success message
            enqueueSnackbar('Email verified successfully!', {
                variant: 'success'
            });
        },
        onError: (error) => {
            // Show error message
            enqueueSnackbar('Failed to verify email. Please check your link or try again.', {
                variant: 'error'
            });

            console.error('Failed to verify email:', error);
        }
    });
};

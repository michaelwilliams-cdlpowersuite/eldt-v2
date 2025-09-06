import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import apiClient from '../../../api/apiClient';

interface ResendEmailRequest {
    checkoutSessionId: string;
}

interface ResendEmailResponse {
    success: boolean;
    message?: string;
}

const resendCheckoutEmail = async ({ checkoutSessionId }: ResendEmailRequest): Promise<ResendEmailResponse> => {
    const response = await apiClient.post(`/eldt/v2/checkout-sessions/${checkoutSessionId}/resend-email`);
    return response.data;
};

export const useCheckoutEmailResend = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: resendCheckoutEmail,
        onSuccess: (data, variables) => {
            // Invalidate checkout session data to reflect any updates
            queryClient.invalidateQueries({
                queryKey: ['checkout-session', variables.checkoutSessionId]
            });

            // Show success message
            enqueueSnackbar('Verification email sent! Please check your inbox.', {
                variant: 'success'
            });

            console.log('Email resent successfully:', data);
        },
        onError: (error) => {
            // Show error message
            enqueueSnackbar('Failed to send verification email. Please try again.', {
                variant: 'error'
            });

            console.error('Failed to resend email:', error);
        }
    });
};

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import apiClient from '../../../api/apiClient';

interface CheckoutRegistrationData {
    firstName: string;
    lastName: string;
    phone: string;
    language: string;
    nameOfTrainer: string;
    typeOfWork: string;
    marketingOptIn: boolean;
    referralSource: string;
    isComplete: boolean;
}

interface CheckoutRegistrationRequest {
    checkoutSessionId: string;
    data: CheckoutRegistrationData;
}

interface CheckoutRegistrationResponse {
    success: boolean;
    message?: string;
}

const submitCheckoutRegistration = async ({ checkoutSessionId, data }: CheckoutRegistrationRequest): Promise<CheckoutRegistrationResponse> => {
    const response = await apiClient.post(`/eldt/v2/checkout-sessions/${checkoutSessionId}/registration-data`, data);
    return response.data;
};

export const useCheckoutRegistration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: submitCheckoutRegistration,
        onSuccess: (data, variables) => {
            // Invalidate checkout session data
            queryClient.invalidateQueries({
                queryKey: ['checkout-session', variables.checkoutSessionId]
            });

            // Invalidate user data after registration completion
            queryClient.invalidateQueries({
                queryKey: ['me']
            });

            // Show success message for step completion
            if (variables.data.isComplete) {
                enqueueSnackbar('Registration completed successfully!', {
                    variant: 'success'
                });
            } else {
                enqueueSnackbar('Step saved successfully', {
                    variant: 'success'
                });
            }

            console.log('Registration data submitted successfully:', data);
        },
        onError: (error, variables) => {
            // Show error message
            const message = variables.data.isComplete
                ? 'Failed to complete registration. Please try again.'
                : 'Failed to save step. Please try again.';

            enqueueSnackbar(message, {
                variant: 'error'
            });

            console.error('Failed to submit registration data:', error);
        }
    });
};

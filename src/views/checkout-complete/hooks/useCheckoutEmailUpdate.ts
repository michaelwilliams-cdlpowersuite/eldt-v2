import { useMutation } from '@tanstack/react-query';
import apiClient from '../../../api/apiClient';

interface UpdateEmailRequest {
    checkoutSessionId: string;
    email: string;
}

interface UpdateEmailResponse {
    success: boolean;
    message?: string;
}

const updateCheckoutEmail = async ({ checkoutSessionId, email }: UpdateEmailRequest): Promise<UpdateEmailResponse> => {
    const response = await apiClient.post(`/api/eldt/v2/checkout-sessions/${checkoutSessionId}/update-email`, {
        email
    });
    return response.data;
};

export const useCheckoutEmailUpdate = () => {
    return useMutation({
        mutationFn: updateCheckoutEmail,
        onSuccess: (data) => {
            // Handle success (could show a success message)
            console.log('Email updated successfully:', data);
        },
        onError: (error) => {
            // Handle error (could show error message)
            console.error('Failed to update email:', error);
        }
    });
};

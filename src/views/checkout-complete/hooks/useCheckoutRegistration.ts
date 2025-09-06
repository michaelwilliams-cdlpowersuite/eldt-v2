import { useMutation } from '@tanstack/react-query';
import apiClient from '../../../api/apiClient';

interface CheckoutRegistrationData {
    firstName: string;
    lastName: string;
    phone: string;
    language: string;
    nameOfTrainer: string;
    typeOfWork: string[];
    marketingOptIn: boolean;
    referralSource: string[];
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
    const response = await apiClient.post(`/api/eldt/v2/checkout-sessions/${checkoutSessionId}/registration-data`, data);
    return response.data;
};

export const useCheckoutRegistration = () => {
    return useMutation({
        mutationFn: submitCheckoutRegistration,
        onSuccess: (data) => {
            console.log('Registration data submitted successfully:', data);
        },
        onError: (error) => {
            console.error('Failed to submit registration data:', error);
        }
    });
};

import { useState, useEffect } from 'react';
import apiClient from '../../../api/apiClient';

interface CheckoutSessionData {
    sessionId: string;
    email: string;
    status: string;
    // Add other properties as needed
}

export const useCheckoutSession = (sessionId: string | null) => {
    const [session, setSession] = useState<CheckoutSessionData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!sessionId) return;

        const fetchSession = async () => {
            setLoading(true);
            setError(null);

            try {
                // Note: This endpoint might need to be implemented on the backend
                const response = await apiClient.get(`/api/eldt/v2/checkout-sessions/${sessionId}`);
                setSession(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, [sessionId]);

    return {
        session,
        loading,
        error,
        refetch: () => {
            if (sessionId) {
                // Re-trigger the effect
                setSession(null);
            }
        }
    };
};

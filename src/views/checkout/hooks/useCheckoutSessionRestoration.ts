import { useState, useEffect, useCallback } from 'react';
import { getCheckoutSession } from '../../../api/api';

interface CheckoutSessionData {
    clientSecret: string;
    products: Array<{ sku: string; quantity: number }>;
    step?: number;
    selectedCourse?: string;
    selectedTheory?: string;
    selectedEndorsements?: string[];
    metadata?: Record<string, any>;
}

interface UseCheckoutSessionRestorationProps {
    onSessionRestored: (sessionData: CheckoutSessionData) => void;
    onSessionNotFound: () => void;
}

export const useCheckoutSessionRestoration = ({
    onSessionRestored,
    onSessionNotFound
}: UseCheckoutSessionRestorationProps) => {
    const [isRestoring, setIsRestoring] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const restoreFromClientSecret = useCallback(async (clientSecret: string) => {
        console.log('Attempting to restore session with client secret:', clientSecret)
        setIsRestoring(true);
        setError(null);

        try {
            const sessionData = await getCheckoutSession(clientSecret);
            console.log('Session data received:', sessionData)

            // Transform the session data to match our expected format
            const restoredData: CheckoutSessionData = {
                clientSecret: sessionData.client_secret || clientSecret,
                products: sessionData.products || [],
                step: sessionData.metadata?.step || 1,
                selectedCourse: sessionData.metadata?.selected_course || '',
                selectedTheory: sessionData.metadata?.selected_theory || '',
                selectedEndorsements: sessionData.metadata?.selected_endorsements || [],
                metadata: sessionData.metadata || {}
            };

            console.log('Transformed session data:', restoredData)
            onSessionRestored(restoredData);
        } catch (err) {
            const error = err as Error;
            console.error('Failed to restore session:', error)
            setError(error);

            // If session not found, call the not found handler
            if ((error as any)?.response?.status === 404) {
                onSessionNotFound();
            }
        } finally {
            setIsRestoring(false);
        }
    }, [onSessionRestored, onSessionNotFound]);

    const restoreFromURL = useCallback(() => {
        // Check if there's a client secret in the URL
        const urlParams = new URLSearchParams(window.location.search);
        const clientSecret = urlParams.get('session');

        console.log('Checking URL for session:', clientSecret)

        if (clientSecret) {
            restoreFromClientSecret(clientSecret);
        } else {
            console.log('No session found in URL, starting fresh')
            onSessionNotFound();
        }
    }, [restoreFromClientSecret, onSessionNotFound]);

    // Auto-restore on mount
    useEffect(() => {
        restoreFromURL();
    }, [restoreFromURL]);

    return {
        isRestoring,
        error,
        restoreFromClientSecret,
        restoreFromLocalStorage: restoreFromURL // This function is no longer used
    };
}; 
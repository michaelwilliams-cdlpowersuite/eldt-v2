import { useState, useEffect, useRef } from 'react';
import {
    createGuestSession,
    getGuestSession,
    updateGuestSessionMetadata,
    deleteGuestSession,
    refreshGuestSession
} from '../../../api/api';

interface GuestSession {
    session_id: string;
    created_at: string;
    last_accessed_at?: string;
    ip_address?: string;
    metadata?: Record<string, any>;
}

export const useGuestSession = () => {
    const [session, setSession] = useState<GuestSession | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Prevent duplicate requests
    const isInitializing = useRef(false);
    const lastUpdateRef = useRef<number>(0);

    const createSession = async () => {
        try {
            const data = await createGuestSession();
            setSession(data);
            return data;
        } catch (err) {
            const error = err as Error;
            setError(error);
            throw error;
        }
    };

    const getSession = async () => {
        try {
            const data = await getGuestSession();
            setSession(data);
            return data;
        } catch (err) {
            const error = err as Error;
            // Don't set error for 404 as it's expected when no session exists
            if ((error as any)?.response?.status !== 404) {
                setError(error);
            }
            throw error;
        }
    };

    const updateMetadata = async (metadata: Record<string, any>) => {
        const now = Date.now()

        // Prevent updates more frequently than every 1 second
        if (now - lastUpdateRef.current < 1000) {
            return;
        }

        // Check if the metadata has actually changed
        const currentMetadata = session?.metadata || {}
        const hasChanged = Object.keys(metadata).some(key => {
            const currentValue = currentMetadata[key]
            const newValue = metadata[key]

            // Deep comparison for arrays and objects
            if (Array.isArray(currentValue) && Array.isArray(newValue)) {
                return JSON.stringify(currentValue) !== JSON.stringify(newValue)
            }

            return currentValue !== newValue
        })

        // Only update if there are actual changes
        if (!hasChanged) {
            return;
        }

        try {
            const data = await updateGuestSessionMetadata(metadata);
            // Update local session state with new metadata
            if (session) {
                setSession({
                    ...session,
                    metadata: {
                        ...session.metadata,
                        ...metadata
                    }
                });
            }
            lastUpdateRef.current = now;
            return data;
        } catch (err) {
            const error = err as Error;
            setError(error);
            throw error;
        }
    };

    // Force update metadata (bypasses rate limiting and change detection)
    const forceUpdateMetadata = async (metadata: Record<string, any>) => {
        try {
            const data = await updateGuestSessionMetadata(metadata);
            // Update local session state with new metadata
            if (session) {
                setSession({
                    ...session,
                    metadata: {
                        ...session.metadata,
                        ...metadata
                    }
                });
            }
            lastUpdateRef.current = Date.now();
            return data;
        } catch (err) {
            const error = err as Error;
            setError(error);
            throw error;
        }
    };

    const removeSession = async () => {
        try {
            await deleteGuestSession();
            setSession(null);
        } catch (err) {
            const error = err as Error;
            setError(error);
            throw error;
        }
    };

    const refreshSession = async () => {
        try {
            const data = await refreshGuestSession();
            setSession(data);
            return data;
        } catch (err) {
            const error = err as Error;
            setError(error);
            throw error;
        }
    };

    useEffect(() => {
        const initializeSession = async () => {
            // Prevent duplicate initialization
            if (isInitializing.current) {
                return;
            }

            isInitializing.current = true;
            setLoading(true);
            setError(null);

            try {
                let currentSession = await getSession();
                if (!currentSession) {
                    currentSession = await createSession();
                }
                setSession(currentSession);

                // Don't auto-initialize - let the checkout hook control this
                // setIsInitialized(true);
            } catch (err) {
                const error = err as Error;
                // Only set error if it's not a 404 (expected when no session exists)
                if ((error as any)?.response?.status !== 404) {
                    setError(error);
                }
                // Don't auto-initialize on error either
                // setIsInitialized(true);
            } finally {
                setLoading(false);
                isInitializing.current = false;
            }
        };

        initializeSession();
    }, []);

    return {
        session,
        loading,
        error,
        createSession,
        getSession,
        updateMetadata,
        forceUpdateMetadata,
        deleteSession: removeSession,
        refreshSession,
    };
}; 
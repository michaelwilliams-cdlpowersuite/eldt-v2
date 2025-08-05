# ELDT Guest Session API Documentation

## Overview

The ELDT Guest Session API provides endpoints for managing guest user sessions without requiring authentication. Guest sessions are tracked via cookies and can be used to provide personalized experiences for non-authenticated users.

**Base URL**: `/api/eldt/v2`

## Authentication

Guest session endpoints do not require authentication. Sessions are managed via cookies and headers.

## Endpoints

### 1. Create Guest Session

**POST** `/guest-session`

Creates a new guest session and sets the session cookie.

#### Request
```http
POST /api/eldt/v2/guest-session
Content-Type: application/json
```

#### Response
```json
{
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2024-01-15T10:30:00.000Z",
    "message": "Guest session created successfully"
}
```

#### Example (JavaScript)
```javascript
const createSession = async () => {
    try {
        const response = await fetch('/api/eldt/v2/guest-session', {
            method: 'POST',
            credentials: 'include', // Important: includes cookies
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        console.log('Session created:', data.session_id);
        return data;
    } catch (error) {
        console.error('Failed to create session:', error);
    }
};
```

---

### 2. Get Session Information

**GET** `/guest-session`

Retrieves current guest session data.

#### Request
```http
GET /api/eldt/v2/guest-session
```

#### Response
```json
{
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2024-01-15T10:30:00.000Z",
    "last_accessed_at": "2024-01-15T11:45:00.000Z",
    "ip_address": "192.168.1.100",
    "metadata": {
        "products_viewed_at": "2024-01-15T11:30:00.000Z",
        "checkout_attempted_at": "2024-01-15T11:45:00.000Z",
        "last_page": "products",
        "time_spent": 300
    }
}
```

#### Error Responses

**404 - No Session Found**
```json
{
    "error": "No guest session found",
    "message": "No active guest session was found in cookies or headers"
}
```

**400 - Invalid Session**
```json
{
    "error": "Invalid guest session",
    "message": "The provided guest session ID is invalid"
}
```

#### Example (JavaScript)
```javascript
const getSession = async () => {
    try {
        const response = await fetch('/api/eldt/v2/guest-session', {
            method: 'GET',
            credentials: 'include'
        });
        
        if (response.status === 404) {
            console.log('No active session found');
            return null;
        }
        
        const data = await response.json();
        console.log('Current session:', data);
        return data;
    } catch (error) {
        console.error('Failed to get session:', error);
    }
};
```

---

### 3. Update Session Metadata

**PUT** `/guest-session`

Updates the session metadata with custom data.

#### Request
```http
PUT /api/eldt/v2/guest-session
Content-Type: application/json

{
    "metadata": {
        "last_page": "checkout",
        "time_spent": 450,
        "products_viewed": ["course-101", "endorsement-201"],
        "user_preferences": {
            "theme": "dark",
            "language": "en"
        }
    }
}
```

#### Response
```json
{
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "message": "Session metadata updated successfully"
}
```

#### Example (JavaScript)
```javascript
const updateSessionMetadata = async (metadata) => {
    try {
        const response = await fetch('/api/eldt/v2/guest-session', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ metadata })
        });
        
        const data = await response.json();
        console.log('Metadata updated:', data);
        return data;
    } catch (error) {
        console.error('Failed to update metadata:', error);
    }
};

// Usage
updateSessionMetadata({
    last_page: 'products',
    time_spent: 300,
    products_viewed: ['course-101']
});
```

---

### 4. Delete Session

**DELETE** `/guest-session`

Deletes the current guest session and clears the session cookie.

#### Request
```http
DELETE /api/eldt/v2/guest-session
```

#### Response
```json
{
    "message": "Guest session deleted successfully"
}
```

#### Example (JavaScript)
```javascript
const deleteSession = async () => {
    try {
        const response = await fetch('/api/eldt/v2/guest-session', {
            method: 'DELETE',
            credentials: 'include'
        });
        
        const data = await response.json();
        console.log('Session deleted:', data.message);
        return data;
    } catch (error) {
        console.error('Failed to delete session:', error);
    }
};
```

---

### 5. Refresh Session

**POST** `/guest-session/refresh`

Refreshes the session TTL (extends the session lifetime).

#### Request
```http
POST /api/eldt/v2/guest-session/refresh
```

#### Response
```json
{
    "session_id": "550e8400-e29b-41d4-a716-446655440000",
    "message": "Guest session refreshed successfully"
}
```

#### Example (JavaScript)
```javascript
const refreshSession = async () => {
    try {
        const response = await fetch('/api/eldt/v2/guest-session/refresh', {
            method: 'POST',
            credentials: 'include'
        });
        
        const data = await response.json();
        console.log('Session refreshed:', data);
        return data;
    } catch (error) {
        console.error('Failed to refresh session:', error);
    }
};
```

---

## React Integration Examples

### Session Management Hook

```javascript
import { useState, useEffect } from 'react';

const useGuestSession = () => {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const createSession = async () => {
        try {
            const response = await fetch('/api/eldt/v2/guest-session', {
                method: 'POST',
                credentials: 'include'
            });
            const data = await response.json();
            setSession(data);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const getSession = async () => {
        try {
            const response = await fetch('/api/eldt/v2/guest-session', {
                credentials: 'include'
            });
            
            if (response.status === 404) {
                return null;
            }
            
            const data = await response.json();
            setSession(data);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const updateMetadata = async (metadata) => {
        try {
            const response = await fetch('/api/eldt/v2/guest-session', {
                method: 'PUT',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ metadata })
            });
            const data = await response.json();
            return data;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    const deleteSession = async () => {
        try {
            const response = await fetch('/api/eldt/v2/guest-session', {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await response.json();
            setSession(null);
            return data;
        } catch (err) {
            setError(err);
            throw err;
        }
    };

    useEffect(() => {
        const initializeSession = async () => {
            setLoading(true);
            try {
                let currentSession = await getSession();
                if (!currentSession) {
                    currentSession = await createSession();
                }
                setSession(currentSession);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
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
        deleteSession
    };
};
```

### Usage in Components

```javascript
import React from 'react';
import { useGuestSession } from './hooks/useGuestSession';

const ProductPage = () => {
    const { session, loading, updateMetadata } = useGuestSession();

    useEffect(() => {
        if (session) {
            // Track page view
            updateMetadata({
                last_page: 'products',
                viewed_at: new Date().toISOString()
            });
        }
    }, [session]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Products</h1>
            {session && (
                <p>Session ID: {session.session_id}</p>
            )}
        </div>
    );
};
```

### Session Context Provider

```javascript
import React, { createContext, useContext } from 'react';
import { useGuestSession } from './hooks/useGuestSession';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    const sessionData = useGuestSession();

    return (
        <SessionContext.Provider value={sessionData}>
            {children}
        </SessionContext.Provider>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within SessionProvider');
    }
    return context;
};
```

## Configuration

### Cookie Settings

The guest session cookie can be configured via environment variables:

```env
ELDT_GUEST_SESSION_COOKIE=eldt_guest_session
ELDT_GUEST_SESSION_TTL=86400
ELDT_GUEST_SESSION_COOKIE_TTL=2592000
ELDT_GUEST_SESSION_SECURE=true
ELDT_GUEST_SESSION_HTTP_ONLY=false
ELDT_GUEST_SESSION_SAME_SITE=lax
```

### Session TTL

- **Session Data**: 24 hours (86400 seconds)
- **Cookie**: 30 days (2592000 seconds)

## Error Handling

All endpoints return appropriate HTTP status codes:

- **200**: Success
- **400**: Bad Request (invalid session ID)
- **404**: Not Found (no session exists)
- **500**: Internal Server Error

## Security Notes

1. **CORS**: Ensure your frontend domain is configured in CORS settings
2. **Credentials**: Always use `credentials: 'include'` for cookie-based sessions
3. **HTTPS**: In production, ensure HTTPS is used for secure cookie transmission
4. **Validation**: Session IDs are validated as UUIDs before processing

## Best Practices

1. **Initialize Early**: Create sessions as soon as the app loads
2. **Track Activity**: Update metadata to track user behavior
3. **Handle Errors**: Always handle 404 responses for missing sessions
4. **Clean Up**: Delete sessions when users log in or leave the app
5. **Refresh**: Use the refresh endpoint for long-running sessions 

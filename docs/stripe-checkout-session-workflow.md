# Stripe Checkout Session Post-Purchase Workflow

## Overview
This document outlines the implementation plan for the post-purchase user verification and account completion workflow after users complete a Stripe checkout session.

## User Flow
1. User completes purchase using `src/views/checkout`
2. User is redirected to `/checkout/complete?checkout_session_id={session_id}`
3. User verifies their email address
4. User completes registration steps (Personal Info & Additional Info)
5. User is handed off to the ELDT system

## Implementation Plan

### 1. Checkout Completion Landing Page
**Route:** `/checkout/complete?checkout_session_id={session_id}`
**File:** `src/views/checkout-complete/CheckoutComplete.tsx`

- **Purpose:** Show email verification requirement after purchase
- **Model after:** `src/views/verify-email/CheckEmailToVerify.tsx`
- **Key differences:**
  - Uses checkout session ID from URL parameters
  - Different API endpoint for email updates
  - Custom messaging for post-purchase context

**API Integration:**
- **Update Email Endpoint:** `POST /api/eldt/v2/checkout-sessions/{checkoutSession}/update-email`
- **Payload:** `{ "email": "new@email.com" }`

### 2. Email Verification Handler
**Route:** `/checkout/verify-email?checkout_session_id={session_id}&token={token}`
**File:** `src/views/checkout-complete/VerifyCheckoutEmail.tsx`

- **Purpose:** Handle email verification link from email
- **Model after:** `src/views/verify-email/VerifyEmail.tsx`
- **Key differences:**
  - Uses checkout session ID instead of user ID
  - Calls different verification endpoint
  - Handles conditional registration completion flow

**API Integration:**
- **Verification Endpoint:** `POST /api/eldt/v2/checkout-sessions/{checkoutSession}/complete-purchase`
- **Response:**
  ```json
  {
    "accessToken": "jwt_token_here",
    "requiresRegistrationCompletion": true|false
  }
  ```
- **Logic:**
  - Save `accessToken` to localStorage as `apiToken`
  - If `requiresRegistrationCompletion` is `true` → redirect to registration steps
  - If `requiresRegistrationCompletion` is `false` → redirect to ELDT handoff

### 3. Post-Purchase Registration Stepper
**Route:** `/checkout/complete-registration`
**File:** `src/views/checkout-complete/CheckoutRegistrationStepper.tsx`

- **Purpose:** Handle Personal Info and Additional Info steps for post-purchase users
- **Model after:** `src/views/registration/Stepper.tsx`
- **Steps:** Only Personal Info (Step 2) and Additional Info (Step 3) from existing registration
- **Key differences:**
  - Simplified stepper with only 2 steps
  - Different API endpoint for data submission
  - Custom completion flow

**Components to reuse:**
- `src/views/registration/Step2.tsx` (Personal Info)
- `src/views/registration/Step3.tsx` (Additional Info)
- Form validation and UI components from registration

**API Integration:**
- **Data Submission Endpoint:** `POST /api/eldt/v2/checkout-sessions/{checkoutSession}/registration-data`
- **Payload:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe", 
    "phone": "5551234567",
    "language": "English",
    "nameOfTrainer": "ABC Driving School",
    "typeOfWork": "Local, Regional",
    "marketingOptIn": true,
    "referralSource": "Google Search",
    "isComplete": true
  }
  ```
- **isComplete logic:**
  - `false` when saving progress (step navigation)
  - `true` when submitting final Additional Info step

### 4. ELDT Handoff
After completing the Additional Info step, redirect using existing handoff logic:
```tsx
const handleAuthRedirect = async () => {
    await prepareHandoff();
    localStorage.removeItem('apiToken');
    window.location.replace(config.angularClientUrl + '/eldt-handoff');
};
```

## File Structure
```
src/views/checkout-complete/
├── CheckoutComplete.tsx           # Landing page after purchase
├── VerifyCheckoutEmail.tsx        # Email verification handler
├── CheckoutRegistrationStepper.tsx # Registration completion stepper
├── hooks/
│   ├── useCheckoutSession.ts      # Hook for checkout session operations
│   ├── useCheckoutEmailUpdate.ts  # Hook for email updates
│   └── useCheckoutRegistration.ts # Hook for registration data submission
└── components/
    └── CheckoutSteps.ts           # Step configuration for checkout flow
```

## Router Updates
Add new routes to `src/routes/RouterWrapper.tsx`:
```tsx
{
  path: "/checkout/complete",
  element: <CheckoutComplete />,
},
{
  path: "/checkout/verify-email", 
  element: <VerifyCheckoutEmail />,
},
{
  path: "/checkout/complete-registration",
  element: <CheckoutRegistrationStepper />,
},
```

## Key Technical Considerations

### State Management
- Use Formik for form validation (consistent with existing registration)
- Maintain checkout session ID throughout the flow
- Handle authentication state with localStorage token management

### Error Handling
- Invalid/expired checkout session IDs
- Failed email verification attempts
- Network errors during API calls
- Graceful fallbacks for each step

### UI/UX Consistency
- Maintain visual consistency with existing registration flow
- Reuse existing components and styling patterns
- Provide clear progress indicators
- Include helpful error messages and support contact information

### API Error Handling
- Handle 404 errors for invalid checkout sessions
- Handle 403 errors for expired or already-used sessions
- Provide user-friendly error messages
- Include fallback contact information

## Implementation Priority
1. **Phase 1:** Checkout completion landing page and email verification
2. **Phase 2:** Registration stepper and data submission
3. **Phase 3:** Error handling and edge cases
4. **Phase 4:** Testing and refinement

## Testing Considerations
- Test with valid and invalid checkout session IDs
- Test email verification flow end-to-end
- Test registration completion with various data inputs
- Test error scenarios and edge cases
- Verify proper handoff to ELDT system
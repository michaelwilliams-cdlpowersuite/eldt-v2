We need to build a workflow for the user to verify and finish setting up their account after they complete a purchase.

The workflow is:
- User completes a purchase using the code in src/views/checkout
- The user will get redirected to /checkout/complete?checkout_session_id={checkout session id here} after completion.

Let's build a plan to implement these changes.

Some information on where code is:
- The new checkout process code is in src/views/checkout
- The existing registration code is in src/views/registration. It uses Formik to validate which we will want to do as well.

We need to:
[ ] Create a page that shows them they need to validate their email address. This page can look exaclty like src/views/verify-email but it needs to be a little different. 1) we will use a different API endpoint to update their email address in case they need to change it. This endpoint will be POST api/eldt/v2/checkout-sessions/{checkoutSession}/update-email with payload of `{ "email": "new email address"}`. Setup the routing for this page to handle url like http://localhost:3001/checkout/complete?checkout_session_id=cs_test_b1QI5wpgz8Nl6x9gnqQf4aHAPrM3FD5PeBOnaif2wQOsNJuzJARkkuwBmW
[ ] We need a page that handles the email verification, this is the link that gets included in the email that is sent to them. We can model after the src/views/verify-email/VerifyEmail.tsx component. The difference is that we will call a different endpoint to verify the email address. This endpoint to call in the API is api/eldt/v2/checkout-sessions/{checkoutSession}/complete-purchase. This will return a response like: `{ "accessToken": "", "requiresRegistrationCompletion": false|true }`. apiToken should be saved to localstorage like it's done in other spots. If requiresRegistrationCompletion is set to true then we need to redirect them to the new personal info and additional info pages to complete their profile. If requiresRegistrationCompletion is false then we can skip to the eldt handoff logic 
[ ] Once they have verified their email then we need to present them with some pages from the registration view workflow found in src/views/registration. We need the Personal Info step and the additional info step. We will save data to a different endpoint so stub out the API logic to save the data that is presented. The UI should function the same and save state as the user progresses through each step.
[ ] When entering personal info and additional info, the API endpoint POST '' should be used. It's payload format is:
    ```json
    {
        "firstName": "",
        "lastName": "",
        "phone": "",
        "language": "",
        "nameOfTrainer": "",
        "typeOfWork": "",
        "marketingOptIn": "",
        "referralSource": "",
        "isComplete": true|false
    }
    ```
    isComplete should be true when the user presses submit on the additional info page, otherwise it's false
[ ] Once the user completes the last step on additional info, then should be handed off to the via this snippet of code in src/views/registration/Stepper.tsx
```tsx
const handleAuthRedirect = async () => {
    await prepareHandoff()
    localStorage.removeItem('apiToken');
    window.location.replace(config.angularClientUrl + '/eldt-handoff');
};
```

The structure and behavior of the stepper component used for registration is good. We just need a new versio that covers this registration after purchase workflow.
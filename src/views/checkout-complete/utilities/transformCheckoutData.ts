import { CheckoutRegistrationFormValues } from "./checkoutValidationSchema";

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

export const transformCheckoutFormikToApi = (
    formikValues: Partial<CheckoutRegistrationFormValues>,
    isComplete: boolean = false
): CheckoutRegistrationData => {
    const { step2, step3 } = formikValues;

    return {
        firstName: step2?.firstName || "",
        lastName: step2?.lastName || "",
        phone: step2?.phone || "",
        language: step2?.language?.label || "",
        nameOfTrainer: step2?.where || "",
        typeOfWork: step3?.workType?.map(work => work.value).join(", ") || "",
        marketingOptIn: step3?.optIn || false,
        referralSource: step3?.referralSource?.value || "",
        isComplete,
    };
};

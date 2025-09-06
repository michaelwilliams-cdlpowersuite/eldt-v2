import * as Yup from "yup";

const phoneRegExp = /\d{10}$/;

// Simplified validation schema for checkout registration (only steps 2 and 3)
export const checkoutValidationSchema = Yup.object({
    step2: Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        phone: Yup.string().required("Required").matches(phoneRegExp, 'Phone number is not valid'),
        language: Yup.object().required("Required"),
        where: Yup.string(), // Optional for checkout flow since course is already purchased
    }),
    step3: Yup.object({
        workType: Yup.array().required("Required"),
        referralSource: Yup.object().required("Required"),
        optIn: Yup.boolean(),
    }),
});

export const buildCheckoutInitialValues = (): CheckoutRegistrationFormValues => {
    return {
        step2: {
            firstName: "",
            lastName: "",
            phone: "",
            language: { label: "English", code: "en", apiValue: 1 },
            where: "",
        },
        step3: {
            optIn: true,
            workType: [],
            referralSource: null,
        },
    };
};

interface Step2 {
    firstName: string;
    lastName: string;
    phone: string;
    language: { label: string; code: string; apiValue: number };
    where: string;
}

interface Step3 {
    optIn: boolean;
    workType: Array<{ label: string; value: string }>;
    referralSource: { label: string; value: string } | null;
}

export interface CheckoutRegistrationFormValues {
    step2: Step2;
    step3: Step3;
}

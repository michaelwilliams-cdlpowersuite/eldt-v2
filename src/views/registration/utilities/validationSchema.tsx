import * as Yup from "yup";
import {getCourseByType, getEndorsementsByApiKeys,} from "./products";
import {User} from "../../../types/user";
import {states} from "./statesList";
import {Student} from "../../../types/student";
import dayjs from "dayjs";
import {
    AttributeName,
    getOptionFromValue,
    getOptionsLabelsAndValues,
    getValueByAttributeName
} from "./customAttributes";
import {getWorkTypeSelection} from "./workType";

const MIN_DATE = dayjs().subtract(100, "years");
const MAX_DATE = dayjs().subtract(14, "years");
const phoneRegExp = /\d{10}$/

export const validationSchema = Yup.object({
    step1: Yup.object({
        selectedCourse: Yup.string(),
        selectedEndorsements: Yup.array(),
    }).test(
        "course-or-endorsement",
        "You must select at least one course or endorsement.",
        (value) => {
            const selectedCourse = value?.selectedCourse || null;
            const selectedEndorsements = value?.selectedEndorsements || [];
            return (
                Boolean(selectedCourse) ||
                (Array.isArray(selectedEndorsements) && selectedEndorsements.length > 0)
            );
        }
    ),
    step2: Yup.object({
        firstName: Yup.string().required("Required"),
        lastName: Yup.string().required("Required"),
        phone: Yup.string().required("Required").matches(phoneRegExp, 'Phone number is not valid'),
        language: Yup.object().required("Required"),
        where: Yup.string().required("Required"),
    }),
    step3: Yup.object({
        workType: Yup.array().required("Required"),
        referralSource: Yup.object().required("Required"),
    }),
    cart: Yup.object({
        signature: Yup.string().required("You must sign the refund policy."),
    }),
});

export const buildInitialValues = (user?: User): RegistrationFormUIValues => {

    return {
        step1: {
            selectedCourse: user?.student?.cdlClass
                ? getCourseByType(user.student.cdlClass)?.id ?? ""
                : "",
            selectedEndorsements: ["haz", "passenger", "schoolBus"]
                .filter((e) => !!(user?.student && user.student[e as keyof Student]))
                .map((e) => getEndorsementsByApiKeys([e])[0].id),
        },
        step2: {
            firstName: user?.firstName ?? "",
            lastName: user?.lastName ?? "",
            phone: user?.student?.phone ?? "",
            dob: "",
            driversLicense: user?.student?.driversLicense ?? "",
            confirmDriversLicense: user?.student?.driversLicense ?? "",
            streetAddress: user?.student?.address.address1 ?? "",
            city: user?.student?.address.city ?? "",
            state: user?.student?.address.state
                ? states.find((s) => s.abbreviation === user.student.address.state) ??
                null
                : null,
            zip: user?.student?.address.zip ?? "",
            language: {label: "English", code: "en", apiValue: 1},
            where: getValueByAttributeName(user?.student?.customAttributes, AttributeName.WHERE) ?? "",
        },
        step3: {
            optIn: true,
            workType: getWorkTypeSelection(user?.student),
            referralSource: getOptionFromValue(getValueByAttributeName(user?.student?.customAttributes, AttributeName.REFERRAL_SOURCES), getOptionsLabelsAndValues(user?.student?.customAttributes, AttributeName.REFERRAL_SOURCES)),
        },
        cart: {
            items: [],
            signature: null,
        },
    }
};

interface Step1 {
    selectedCourse: string;
    selectedEndorsements: string[];
}

interface Step2 {
    firstName: string;
    lastName: string;
    phone: string;
    dob: string;
    driversLicense: string;
    confirmDriversLicense: string;
    streetAddress: string;
    city: string;
    state: { label: string; abbreviation: string } | null;
    zip: string;
    language: { label: string; code: string; apiValue: number };
    where: string;
}

interface Step3 {
    optIn: boolean;
    workType: { label: string; value: string }[] | null;
    referralSource: { label: string; value: string | number } | null;
}

export interface CartItem {
    price: number;
    sku: string;
}

export interface Cart {
    items: CartItem[];
    signature: string | null;
}

export interface RegistrationFormUIValues {
    step1: Step1;
    step2: Step2;
    step3: Step3;
    cart: Cart;
    // Add additional steps as needed
}

import * as Yup from "yup";
import { Endorsement } from "./products";

const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;

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
    phone: Yup.string()
      .required("Required")
      .matches(phoneRegExp, "Phone number is not valid"),
    dob: Yup.date().required("Required"),
    driversLicense: Yup.string().required("Required"),
    confirmDriversLicense: Yup.string()
      .oneOf([Yup.ref("driversLicense"), undefined], "Must match")
      .required("Required"),
    streetAddress: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.object().required("Required"),
    zip: Yup.string()
      .required("Required")
      .matches(/^\d{5}$/, "Zipcode must be exactly 5 digits"),
    language: Yup.object().required("Required"),
  }),
  step3: Yup.object({
    optIn: Yup.boolean().required("Required").default(true),
    transmission: Yup.object().when("optIn", {
      is: true,
      then: (schema: any) => schema.required("Required"),
      otherwise: (schema: any) => schema.nullable(),
    }),
    cdlDate: Yup.string().when("optIn", {
      is: true,
      then: (schema: any) => schema.required("Required"),
      otherwise: (schema: any) => schema,
    }),
    cdlType: Yup.object().when("optIn", {
      is: true,
      then: (schema: any) => schema.required("Required"),
      otherwise: (schema: any) => schema.nullable(),
    }),
    endorsements: Yup.array().when("optIn", {
      is: true,
      then: (schema: any) => schema.required("Required"),
      otherwise: (schema: any) => schema.nullable(),
    }),
    workType: Yup.array().when("optIn", {
      is: true,
      then: (schema: any) => schema.required("Required"),
      otherwise: (schema: any) => schema.nullable(),
    }),
    where: Yup.string().when("optIn", {
      is: true,
      then: (schema: any) => schema.required("Required"),
      otherwise: (schema: any) => schema,
    }),
    referralSource: Yup.object().when("optIn", {
      is: true,
      then: (schema: any) => schema.required("Required"),
      otherwise: (schema: any) => schema.nullable(),
    }),
  }),
  step4: Yup.object({
    selectedCourseType: Yup.string().required("Required"),
  }),
});

export const initialValues: RegistrationFormUIValues = {
  step1: { selectedCourse: "", selectedEndorsements: [] },
  step2: {
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    driversLicense: "",
    confirmDriversLicense: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    language: { label: "English", code: "en" },
  },
  step3: {
    optIn: true,
    transmission: null,
    cdlDate: "",
    cdlType: null,
    endorsements: null,
    workType: null,
    where: "",
    referralSource: null,
  },
  step4: { selectedCourseType: "" },
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
  state: string;
  zip: string;
  language: { label: string; code: string };
}

interface Step3 {
  optIn: boolean;
  transmission: { label: string } | null;
  cdlDate: string;
  cdlType: { label: string } | null;
  endorsements: Endorsement[] | null;
  workType: { label: string } | null;
  where: string;
  referralSource: { label: string } | null;
}

interface Step4 {
  selectedCourseType: string;
}

export interface RegistrationFormUIValues {
  step1: Step1;
  step2: Step2;
  step3: Step3;
  step4: Step4;
  // Add additional steps as needed
}

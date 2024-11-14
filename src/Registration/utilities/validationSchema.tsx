import * as Yup from "yup";

const phoneRegExp = /^\(\d{3}\) \d{3}-\d{4}$/;

//TODO Add validation for step 1 per Connor and Michael convo => must select a course OR endorsement

export const validationSchema = Yup.object({
  step1: Yup.object({
    selectedCourse: Yup.string(),
    selectedEndorsements: Yup.array(),
  }).test(
    "course-or-endorsement",
    "You must select at least one course or endorsement.",
    (value) => {
      return !!(
        value?.selectedCourse ||
        (value?.selectedEndorsements && value.selectedEndorsements.length > 0)
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
    optIn: Yup.boolean().required("Required"),
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
  // TODO: Add fields per Connor => if checked, all required
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

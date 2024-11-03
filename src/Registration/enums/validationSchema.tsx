import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const validationSchema = Yup.object({
  step1: Yup.object({
    selectedCourse: Yup.string().required("Required"),
    selectedEndorsements: Yup.array(),
  }),
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
  step3: Yup.object({}),
});

export const initialValues = {
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
    automaticTransmission: "",
    language: { label: "English", code: "en" },
    startDate: "",
  },
};

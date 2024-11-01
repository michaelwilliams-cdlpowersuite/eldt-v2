import dayjs from "dayjs";
import * as Yup from "yup";

export const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  dob: Yup.date().required("Required"),
  driversLicense: Yup.string().required("Required"),
  confirmDriversLicense: Yup.string()
    .oneOf([Yup.ref("driversLicense"), undefined], "Must match")
    .required("Required"),
  streetAddress: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zip: Yup.string()
    .required("Required")
    .matches(/^\d{5}$/, "Zipcode must be exactly 5 digits"),
});

export const initialValues = {
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
  selectedCourse: "",
  selectedEndorsements: [],
};

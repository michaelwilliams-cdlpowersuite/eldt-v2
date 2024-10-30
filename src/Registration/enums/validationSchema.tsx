import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "At least 8 characters").required("Required"),
});

export const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  birthday: "",
  driversLicense: "",
  confirmDriversLicense: "",
  streetAddress: "",
  city: "",
  state: "",
  zip: "",
  socialSecurity: "",
  race: "",
  hispanic: "",
  disabled: "",
  veteran: "",
  sex: "",
  isPlanningHazmat: "",
  funding: "",
  automaticTransmission: "",
  language: "",
  startDate: "",
};

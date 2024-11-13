import { RegistrationFormUIValues } from "./validationSchema";

//TODO Michael: Here's the Interpretation layer
//TODO Michael: Make sure to update the model as you go
//TODO Michael: You can find the shape of the form data in the validationSchema.tsx file

export interface ApiData {
  course?: string;
  endorsements?: string[];
  firstName?: string;
}

export const transformFormikToApi = (
  formikValues: RegistrationFormUIValues
): ApiData => {
  return {
    course: formikValues.step1.selectedCourse,
    endorsements: formikValues.step1.selectedEndorsements,
    firstName: formikValues.step2.firstName,
  };
};

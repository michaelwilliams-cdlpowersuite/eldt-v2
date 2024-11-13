import { RegistrationFormUIValues } from "./validationSchema";

//TODO Michael: Here's the Interpretation layer
//TODO Michael: Make sure to update the `ApiData` model as you go
//TODO Michael: You can find the shape of the RegistrationFormUIValues in the validationSchema.tsx file

// API type
interface ApiData {
  course?: string;
  endorsements?: string[];
  personalInfo?: {
    firstName: string;
    lastName: string;
  };
}

// Transform function
export const transformFormikToApi = (
  formikValues: Partial<RegistrationFormUIValues>
): ApiData => {
  const apiData: ApiData = {};

  if (formikValues.step1) {
    apiData.course = formikValues.step1.selectedCourse;
    apiData.endorsements = formikValues.step1.selectedEndorsements;
  }

  if (formikValues.step2) {
    apiData.personalInfo = {
      firstName: formikValues.step2.firstName,
      lastName: formikValues.step2.lastName,
    };
  }

  return apiData;
};

import dayjs from "dayjs";
import { RegistrationFormUIValues } from "./validationSchema";
import { endorsements } from "./products";

interface ApiData {
  cdlClass?: string;
  haz?: boolean; // Can explicitly hold true/false
  schoolBus?: boolean; // Can explicitly hold true/false
  passenger?: boolean; // Can explicitly hold true/false
  user?: {
    firstName?: string;
    lastName?: string;
  };
  phone?: string;
  dob?: string;
  driversLicense?: string;
  confirmDriversLicense?: string;
  languageId?: number;
}

export const transformFormikToApi = (
  formikValues: Partial<RegistrationFormUIValues>
): ApiData => {
  const apiData: ApiData = {};

  if (formikValues.step1) {
    apiData.cdlClass = formikValues.step1.selectedCourse;

    // Initialize all endorsement-related fields to false
    apiData.haz = false;
    apiData.passenger = false;
    apiData.schoolBus = false;

    console.log(formikValues.step1.selectedEndorsements);
    // Map selectedEndorsements to API booleans
    if (formikValues.step1.selectedEndorsements) {
      formikValues.step1.selectedEndorsements.forEach((id) => {
        const endorsement = endorsements.find((e) => e.id === id);
        if (
          endorsement &&
          ["haz", "passenger", "schoolBus"].includes(endorsement.apiKey)
        ) {
          // Ensure TypeScript knows this is a valid key
          const key = endorsement.apiKey as "haz" | "passenger" | "schoolBus";
          apiData[key] = true;
        }
      });
    }
  }

  if (formikValues.step2) {
    apiData.user = {
      firstName: formikValues.step2.firstName,
      lastName: formikValues.step2.lastName,
    };

    apiData.dob = formikValues.step2.dob
      ? dayjs(formikValues.step2.dob).toISOString()
      : undefined;

    apiData.phone = formikValues.step2.phone;
  }

  return apiData;
};

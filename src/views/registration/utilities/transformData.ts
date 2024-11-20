import dayjs from "dayjs";
import { RegistrationFormUIValues } from "./validationSchema";
import { courses, endorsements } from "./products";

interface ApiData {
  firstName?: string;
  lastName?: string;

  cdlClass?: string;
  haz?: boolean;
  schoolBus?: boolean;
  passenger?: boolean;
  phone?: string;
  dob?: string;
  driversLicense?: string;
  confirmDriversLicense?: string;
  languageId?: number;
  address1?: string;
  zip?: string;
  city?: string;
  state?: string;

  automatic_transmission?: boolean;
  cdlCompletedDate?: string; // ISO string
}

export const transformFormikToApi = (
  formikValues: Partial<RegistrationFormUIValues>
): ApiData => {
  const apiData: ApiData = {};

  if (formikValues.step1) {
    // CDL Class
    const selectedCourseId = formikValues.step1.selectedCourse;
    const selectedCourse = courses.find(
      (course) => course.id === selectedCourseId
    );
    if (selectedCourse) {
      apiData.cdlClass = selectedCourse.type;
    }

    // Endorsements
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
    apiData.firstName = formikValues.step2.firstName;
    apiData.lastName = formikValues.step2.lastName;

    apiData.dob = formikValues.step2.dob
      ? dayjs(formikValues.step2.dob).toISOString()
      : undefined;

    apiData.phone = formikValues.step2.phone;
    apiData.driversLicense = formikValues.step2.driversLicense;
    apiData.confirmDriversLicense = formikValues.step2.confirmDriversLicense;
    apiData.address1 = formikValues.step2.streetAddress;
    apiData.zip = formikValues.step2.zip;
    apiData.city = formikValues.step2.city;
    apiData.state = formikValues.step2.state?.abbreviation;
    apiData.languageId = formikValues.step2.language.apiValue;
  }

  if (formikValues.step3) {
    apiData.automatic_transmission = formikValues.step3.transmission?.apiValue;

    apiData.cdlCompletedDate = formikValues.step3.cdlDate
        ? dayjs(formikValues.step3.cdlDate).toISOString()
        : undefined;

    // enrollmentClassAComplete: node.value.cdlTrainingType?.contains('Class A') ?? undefined,
    // enrollmentClassBComplete: node.value.cdlTrainingType?.contains('Class B') ?? undefined,
    // enrollmentEndorsementHazComplete: node.value.cdlEndorsements?.contains('HAZ') ?? undefined,
    // enrollmentEndorsementPassengerComplete: node.value.cdlEndorsements?.contains('Passenger') ?? undefined,
    // enrollmentEndorsementSchoolBusComplete: node.value.cdlEndorsements?.contains('School Bus') ?? undefined,
    // enrollmentDesiredWorkLocal: node.value.typeOfWork?.contains('Local') ?? undefined,
    // enrollmentDesiredWorkOTR: node.value.typeOfWork?.contains('OTR') ?? undefined,
    // enrollmentDesiredWorkRegional: node.value.typeOfWork?.contains('Regional') ?? undefined,
    // enrollmentDesiredWorkIDC: node.value.typeOfWork?.contains('IDC') ?? undefined,
    // personalInfoReleased: node.value.personalInfoReleased,
  }

  return apiData;
};

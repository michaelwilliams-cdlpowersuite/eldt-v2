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
  enrollmentClassAComplete?: boolean;
  enrollmentClassBComplete?: boolean;
  enrollmentEndorsementHazComplete?: boolean;
  enrollmentEndorsementPassengerComplete?: boolean;
  enrollmentEndorsementSchoolBusComplete?: boolean;
  enrollmentDesiredWorkLocal?: boolean;
  enrollmentDesiredWorkOTR?: boolean;
  enrollmentDesiredWorkRegional?: boolean;
  enrollmentDesiredWorkIDC?: boolean;
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

    apiData.enrollmentClassAComplete =
      formikValues.step3.cdlType?.label.includes("Class A");
    apiData.enrollmentClassBComplete =
      formikValues.step3.cdlType?.label.includes("Class B");
    apiData.enrollmentEndorsementHazComplete =
      formikValues.step3.endorsements?.some((endorsement: { apiKey: string }) =>
        endorsement.apiKey.includes("haz")
      );
    apiData.enrollmentEndorsementPassengerComplete =
      formikValues.step3.endorsements?.some((endorsement: { apiKey: string }) =>
        endorsement.apiKey.includes("passenger")
      );
    apiData.enrollmentEndorsementSchoolBusComplete =
      formikValues.step3.endorsements?.some((endorsement: { apiKey: string }) =>
        endorsement.apiKey.includes("schoolBus")
      );
    apiData.enrollmentDesiredWorkLocal = formikValues.step3.workType?.some(
      (workType: { value: string }) => workType.value.includes("local")
    );
    apiData.enrollmentDesiredWorkOTR = formikValues.step3.workType?.some(
      (workType: { value: string }) => workType.value.includes("otr")
    );
    apiData.enrollmentDesiredWorkRegional = formikValues.step3.workType?.some(
      (workType: { value: string }) => workType.value.includes("regional")
    );
    apiData.enrollmentDesiredWorkIDC = formikValues.step3.workType?.some(
      (workType: { value: string }) => workType.value.includes("idc")
    );
  }

  return apiData;
};

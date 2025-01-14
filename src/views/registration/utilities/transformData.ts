import dayjs from "dayjs";
import {RegistrationFormUIValues} from "./validationSchema";
import {courses, endorsements} from "./products";
import config from "../../../config";
import {CustomAttribute} from "../../../types/customAttribute";
import {getBlankReferralSource, getBlankWhere} from "./customAttributes";

interface ApiData {
  firstName?: string;
  lastName?: string;

  locationId: number;
  packageId?: number;

  signature?: string;
  customAgreementTerms?: boolean;
  applicationCompletedAt?: Date;

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
  customAttributes?: CustomAttribute[]
  personalInfoReleased?: boolean;
}


export const transformFormikToApi = (
  formikValues: Partial<RegistrationFormUIValues>
): ApiData => {
  const apiData: ApiData = {
    locationId: config.locationId,
  };


  if (formikValues.step1) {
    // CDL Class
    const selectedCourseId = formikValues.step1.selectedCourse;
    const selectedCourse = courses.find(
      (course) => course.id === selectedCourseId
    );

    if (selectedCourse) {
      apiData.cdlClass = selectedCourse.type;
      apiData.packageId = config.packageIds[apiData.cdlClass];
    } else {
      apiData.cdlClass = 'None';
      apiData.packageId = config.packageIds['None'];
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

    // CDL Completion Hack
    // enrollment completed
      switch (selectedCourseId) {
        case "1":
          apiData.enrollmentClassAComplete = true;
          break;
        case "2":
          apiData.enrollmentClassBComplete = true;
          break;
        case "3":
          apiData.enrollmentClassAComplete = true;
          apiData.enrollmentClassBComplete = true;
          break;
      }

    // endorsements completed
    if (formikValues.step1.selectedEndorsements) {
      if (formikValues.step1.selectedEndorsements.includes("1")) {
        apiData.enrollmentEndorsementHazComplete = true;
      }
      if (formikValues.step1.selectedEndorsements.includes("2")) {
        apiData.enrollmentEndorsementPassengerComplete = true;
      }
      if (formikValues.step1.selectedEndorsements.includes("3")) {
        apiData.enrollmentEndorsementSchoolBusComplete = true;
      }
    }

  }

  if (formikValues.step2) {
    apiData.firstName = formikValues.step2.firstName;
    apiData.lastName = formikValues.step2.lastName;

    apiData.dob = formikValues.step2.dob
      ? dayjs(formikValues.step2.dob).toISOString()
      : undefined;

    apiData.phone = formikValues.step2.phone;
    // apiData.driversLicense = formikValues.step2.driversLicense;
    // apiData.confirmDriversLicense = formikValues.step2.confirmDriversLicense;
    // apiData.address1 = formikValues.step2.streetAddress;
    // apiData.zip = formikValues.step2.zip;
    // apiData.city = formikValues.step2.city;
    // apiData.state = formikValues.step2.state?.abbreviation;
    apiData.languageId = formikValues.step2.language.apiValue;

    apiData.customAttributes = [getBlankWhere(formikValues.step2.where)];
  }

  if (formikValues.step3) {
    // @see completedApplication() in student-form.service.ts
    apiData.signature = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGhJREFUeF7t1IEJADAMAsF2/6EtdIuHywRyBu+2HUeAAIGAwDVYgZZEJEDgCxgsj0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIg8ACBlFZdWYR+vQAAAABJRU5ErkJggg==';
    apiData.customAgreementTerms = true;
    apiData.personalInfoReleased = formikValues.step3.optIn;
    apiData.applicationCompletedAt = new Date();

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
    if(formikValues.step3.referralSource){
      // @ts-ignore
      apiData.customAttributes = [getBlankReferralSource(formikValues.step3.referralSource)];
    }
  }

  return apiData;
};


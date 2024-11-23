import {Address} from "./address";

export interface Student {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    archivedAt: Date;

    // user: User;
    // company: Company;
    //
    address: Address;
    // attendance: StudentAttendance;
    // attendances: StudentAttendance[];
    // fileUploads: StudentFileUpload[];
    // eldtRequiredTaskTypes: TaskType[];
    // eldtReadyTaskTypes: TaskType[];
    // sponsorships: StudentSponsorship[];

    readyToTest: boolean;
    haz: boolean;
    cod: boolean;
    completed: boolean;
    completedReason: string;
    hasActivePromotion: boolean;
    hasFailedTest: boolean;

    driversLicense: string;
    confirmDriversLicense: string;
    cdlClass: string;
    phone: string;
    phoneVerified: boolean;
    funding: string;
    fundingHidden: boolean;
    invoiceNumber: string;
    comment: string;
    docusignUrl: string;
    removalReason: string;
    previousFailureReasonId: number;
    // paymentStatus: PaymentStatus;

    amountPaid: number;
    tuitionCharged: number;
    locationId: number;
    locationName: string;
    uploadedFileCount: number;
    colorTagId: number;

    testDate: Date;
    dob: Date;
    startDate: Date;
    endDate: Date;
    proposedStartDate: Date;
    potentialStartDate: Date;
    hazTestDate: Date;
    hazEndDate: Date;
    signedElectronicallyAt: Date;
    applicationCompletedAt: Date;
    signature: string;
    completedHazAt: Date;

    certificateUrl: string;
    downloadCertificateUrl: string;
    emailCertificateUrl: string;

    transcriptUrl: string;
    downloadTranscriptUrl: string;
    emailTranscriptUrl: string;

    eldtCertificateUrl: string;
    downloadEldtCertificateUrl: string;
    emailEldtCertificateUrl: string;

    ssn: string;
    automatic_transmission: boolean;
    race: number;
    hispanic: number;
    disabled: number;
    veteran: number;
    gender: string;
    education: number;
    online: boolean;

    financialComment: string;
    registrationPdfUrl: string;
    registrationDownloadPdfUrl: string;
    canClearRegistrationPdfCache: boolean;
    studentProfilePdfUrl: string;
    financialInfoPdfUrl: string;
    studentProfileDownloadPdfUrl: string;
    financialInfoPdfDownloadUrl: string;

    submittedToTprAt: Date;
    theorySubmittedToTprAt: Date;
    hazTheorySubmittedToTprAt: Date;
    hasTprClient: boolean;
    tprFeePaidAt: Date;
    hazTprFeePaidAt: Date;
    tprCheckoutEligible: boolean;
    hazTprCheckoutEligible: boolean;
    passengerTprCheckoutEligible: boolean;
    schoolBusTprCheckoutEligible: boolean;
    companyId: number;
    personalInfoReleased: boolean;
    btwTime: string;
    schoolBus: boolean;
    schoolBusBtwSubmittedToTprAt: Date;
    schoolBusTheorySubmittedToTprAt: Date;
    schoolBusTprFeePaidAt: Date;
    passenger: boolean;
    passengerBtwSubmittedToTprAt: Date;
    passengerTheorySubmittedToTprAt: Date;
    passengerTprFeePaidAt: Date;
    packageId: number;
    packageTitle: string;
    averageTestingScore: number;
    averageTrainingScore: number;
    averageAssessmentScore: number;
    // lastDrive: StudentEvent;
    depositPaidAt: Date;
    depositAmount: number;
    legacyFinancialData: boolean;
    tprUnlockedBy: string;
    hazTprUnlockedBy: string;
    passengerTprUnlockedBy: string;
    schoolBusTprUnlockedBy: string;
    languageId: number;
    // customAttributes: CustomAttribute[];
    assessmentScore: number;
    assessmentScoreTotal: number;
    // longestBadEvent: StudentEvent;
    ssnAdminEditable: boolean;

    masterCourseDefault: boolean;
    masterCdlCourseFeePaidAt: Date;
    masterCdlCourseUnlockedBy: string;
    masterHazCourseFeePaidAt: Date;
    masterHazCourseUnlockedBy: string;
    masterSchoolBusCourseFeePaidAt: Date;
    masterSchoolBusCourseUnlockedBy: string;
    masterPassengerCourseFeePaidAt: Date;
    masterPassengerCourseUnlockedBy: string;
    companyFunded: boolean;

    quizTaker: boolean;
    approvedAt: Date;
    approvedBy: string;

    importedFromCompanyId: number;
    showEldtLeadPrompt: boolean;
    completedCdl: string;
    completedEndorsements: string;
    desiredTypesOfWork: string;
    companySponsoredInterest: boolean;

    enrollmentClassAComplete: boolean;
    enrollmentClassBComplete: boolean;
    enrollmentEndorsementHazComplete: boolean;
    enrollmentEndorsementPassengerComplete: boolean;
    enrollmentEndorsementSchoolBusComplete: boolean;
    enrollmentDesiredWorkLocal: boolean;
    enrollmentDesiredWorkOTR: boolean;
    enrollmentDesiredWorkRegional: boolean;
    enrollmentDesiredWorkIDC: boolean;
    cdlCompletedDate: Date;
    recruiterNotes: string;
    // recruiterStudent: RecruiterStudent;
    freshImport: boolean;
    // payments: Payment[];
    // runningTimerInfo: RunningTimerInfo[];

    adminSelectedPackage: boolean;
}

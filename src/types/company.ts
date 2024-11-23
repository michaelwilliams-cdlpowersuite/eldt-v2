export interface Company {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    name: string;
    companyMetadataType: string;
    uiSettings: CompanyUiSettings;
    dashboardCsvUrl: string;
    stripeKey: string;
    logoPath: string;
    registrationSignature: string;
    tprCertId: string;
    manualTprValues: boolean;
    supportedCourses: string[];
    tprFeesAsTuition: boolean;
    endorsementFeesAsTuition: boolean;
    emailFrom: string;
    emailSignature: string;
    newUserEmail: string;
    existingUserEmail: string;
    registrationEmailTitle: string;
    includeLeads: boolean;
    allowStudentAddEndorsement: boolean;
    enableStudentApproval: boolean;
    skipApplication: boolean;
    hasOwner: boolean;
    ownerTitle: string;
    successMessage: string;
    showSafetyPrompt: boolean;
    taxExempt: boolean;
    allowPersonalInfoRelease: boolean;
    distance: string;
    private: boolean;
    trialExpiresOn: Date;
    subscriptionSummary: string;
    subscriptionValid: boolean;
    availableCredits: number;
    allowStudentPurchases: boolean;
    tprExpirationDate: Date;
}

export interface CompanyUiSettings {
    studentModelDisplayName: string;
    adminStudentProfile: UiSettingsTypes;
    adminDashboardType: UiSettingsTypes;
    studentDashboardType: UiSettingsTypes;
    loginType: UiSettingsTypes;
}

export enum UiSettingsTypes {
    Drive509AdminDashboard = 'drive509',
    UrmAdminDashboard = 'urm',
    EldtStudentDashboard = 'eldt',
    UrmStudentDashboard = 'urm',
    EldtLogin = 'eldt',
    RecruiterDashboard = 'recruiter',
}

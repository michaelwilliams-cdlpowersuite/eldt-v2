import {Role} from "./role";
import {Company} from "./company";
import {Student} from "./student";

export interface User {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;

    email: string;
    emailVerifiedAt: Date;
    firstName: string;
    lastName: string;
    phone: string;
    phoneVerified: boolean;
    newUser: boolean;
    hasPaymentMethod: boolean;
    registeredToNewCompany: boolean;
    showInstallPrompt: boolean;

    permissions: string[];
    roles: Role[];
    testingLocationId: number;
    lastCompanyId: number;
    lastLocationIds: { [key: string]: number };
    companyIds: number[];
    companies: Company[];
    unavailableCompanyIds: number[];
    unavailableCompanies: Company[];

    student: Student;
    students: Student[];
    avatarPath: string;
    lastLoggedIn: Date;

    systemSearch?: boolean;

    locationIds: number[];
    internalTester: boolean;
}

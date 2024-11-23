export interface Role {
    id: number;
    name: string;
    category: RoleCategory;
    description: string;
    availableRoleIds: number[];
    subcategory: RoleSubcategory;
    password: string;
}

export enum RoleCategory {
    Dashboard = 'dashboard',
    SpecialRole = 'special role',
    Notification = 'notification',
    Atomic = 'atomic',
}

export enum RoleSubcategory {
    Administrative = 'administrative roles',
    Trainer = 'trainer roles',
    Additional = 'additional roles',
    FinancialAdmin = 'financial admin',
    UserResponsibility = 'user responsibilities',
    TrainerResponsibility = 'trainer responsibilities',
    EmailNotification = 'email notifications',
}

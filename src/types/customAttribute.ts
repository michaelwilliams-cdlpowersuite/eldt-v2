
export interface CustomAttribute {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    groupName: string;
    groupDescription: string;
    attributeName: string;
    adminEditable: boolean;
    value: any;
    fieldType: CustomAttributeFieldType;
    sort?: number;
    config: CustomAttributeConfig;
}

export interface CustomAttributeConfigOptions {
    exportValue?: string;
    label: string;
    value: string;
}

export interface CustomAttributeConfig {
    required?: boolean;
    options?: CustomAttributeConfigOptions[];
}

export enum CustomAttributeFieldType {
    Text            = 'text',
    Textarea        = 'textarea',
    Checkbox        = 'checkbox',
    Date            = 'date',
    Phone           = 'phone',
    SelectOne       = 'select_one',
    SelectMultiple  = 'select_multiple',
    Number          = 'number',
    Radio           = 'radio',
}

export const fieldTypesThatNeedParseInt = [
    CustomAttributeFieldType.SelectOne,
    CustomAttributeFieldType.Radio
];

import {CustomAttribute, CustomAttributeFieldType} from "../../../types/customAttribute";

export enum AttributeName {
    WHERE = "What School or Agency will you be attending for your Public Road and Range Training?",
    REFERRAL_SOURCES = "How did you hear about ELDT.com?",
}

const getValueByAttributeName = (
    attributes: CustomAttribute[] | undefined,
    attributeName: AttributeName
): any => {
    if (!attributes) return null;
    const attribute = attributes.find(attr => attr.attributeName === attributeName);
    return attribute?.value || null; // Return null if not found
};

interface Option {
    label: string;
    value: number | string;
}

function getOptionFromValue(
    value: string | number,
    options: Option[]
): Option | null {
    const match = options.find((opt) => String(opt.value) === String(value));
    return match ?? null;
}

const getOptionsLabelsAndValues = (
    attributes: CustomAttribute[] | undefined,
    attributeName: string
): { label: string; value: string }[] => {
    if (!attributes) return [];
    const attribute = attributes.find(attr => attr.attributeName === attributeName);

    if (attribute && attribute.config.options) {
        return attribute.config.options.map(option => ({
            label: option.label,
            value: option.value,
        }));
    }

    return [];
};

const getBlankWhere = (value: string) => {
  return {
             "groupName": "Thank you for choosing ELDT.com",
             "attributeName": "What School or Agency will you be attending for your Public Road and Range Training?",
             "fieldType": CustomAttributeFieldType.Textarea,
             "config": {
               "options": undefined,
               "required": true
             },
             "value": value,
             "adminEditable": false,
             "groupDescription": null
           }
}

const getBlankReferralSource = (option: { label: string, value: string } | null) => {
    if (!option?.value) return null;

    return {
        "groupName": "Thank you for choosing ELDT.com",
        "attributeName": "How did you hear about ELDT.com?",
        "fieldType": CustomAttributeFieldType.Radio,
        "config": {
            "options": [
                {
                    "hide": null,
                    "label": "My CDL School sent me",
                    "value": 1,
                    "disabled": null,
                    "groupLabel": null,
                    "exportValue": undefined
                },
                {
                    "hide": null,
                    "label": "Facebook Ads",
                    "value": 2,
                    "disabled": null,
                    "groupLabel": null,
                    "exportValue": undefined
                },
                {
                    "hide": null,
                    "label": "Google Ads",
                    "value": 3,
                    "disabled": null,
                    "groupLabel": null,
                    "exportValue": undefined
                },
                {
                    "hide": null,
                    "label": "Heard about it from a friend",
                    "value": 4,
                    "disabled": null,
                    "groupLabel": null,
                    "exportValue": undefined
                },
                {
                    "hide": null,
                    "label": "I found ELDT.com online searching",
                    "value": 5,
                    "disabled": null,
                    "groupLabel": null,
                    "exportValue": undefined
                },
                {
                    "hide": null,
                    "label": "My Employer sent me",
                    "value": 6,
                    "disabled": null,
                    "groupLabel": null,
                    "exportValue": undefined
                }
            ],
            "required": true,
        },
        "value": option.value,
        "adminEditable": false,
        "groupDescription": null
    }
}

export {getBlankWhere, getBlankReferralSource, getOptionFromValue, getValueByAttributeName, getOptionsLabelsAndValues}

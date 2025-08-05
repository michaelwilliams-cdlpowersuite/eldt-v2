import { useField, useFormikContext } from "formik";
import { useCallback } from "react";

export const useSelectEndorsements = () => {
    const [field, meta] = useField("step3.selectedEndorsements");
    const { setFieldValue, setFieldTouched, validateField } = useFormikContext();

    return useCallback(
        (id: string) => {
            const currentEndorsements = field.value || [];
            const newEndorsements = currentEndorsements.includes(id)
                ? currentEndorsements.filter((endorsement: string) => endorsement !== id)
                : [...currentEndorsements, id];

            setFieldValue("step3.selectedEndorsements", newEndorsements).then(() => {
                validateField("step3.selectedEndorsements");
            });
            setFieldTouched("step3.selectedEndorsements", true);
        },
        [field, setFieldValue, setFieldTouched, validateField]
    );
}; 
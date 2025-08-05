import { useField, useFormikContext } from "formik";
import { useCallback } from "react";

export const useSelectTheory = () => {
    const [field, meta] = useField("step2.selectedTheory");
    const { setFieldValue, setFieldTouched, validateField } = useFormikContext();

    return useCallback(
        (id: string) => {
            setFieldValue("step2.selectedTheory", id).then(() => {
                validateField("step2.selectedTheory");
            });
            setFieldTouched("step2.selectedTheory", true);
        },
        [field, setFieldValue, setFieldTouched, validateField]
    );
}; 
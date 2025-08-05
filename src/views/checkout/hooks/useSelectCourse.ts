import { useField, useFormikContext } from "formik";
import { useCallback } from "react";

export const useSelectCourse = () => {
    const [field, meta] = useField("step1.selectedCourse");
    const { setFieldValue, setFieldTouched, validateField } = useFormikContext();

    return useCallback(
        (id: string) => {
            setFieldValue("step1.selectedCourse", id).then(() => {
                validateField("step1.selectedCourse");
            });
            setFieldTouched("step1.selectedCourse", true);
        },
        [field, setFieldValue, setFieldTouched, validateField]
    );
}; 
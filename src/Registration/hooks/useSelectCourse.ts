import { useField, useFormikContext } from "formik";
import { useCallback } from "react";
import { Course } from "../utilities/products";

export const useSelectCourse = () => {
  const [field, meta] = useField("step1.selectedCourse");
  const { setFieldValue, setFieldTouched, validateField } = useFormikContext();

  return useCallback(
    (id: Course["id"]) => {
      const newValue = field.value === id ? "" : id;

      setFieldValue("step1.selectedCourse", newValue).then(() => {
        validateField("step1.selectedCourse");
      });

      if (field.value !== id) {
        setFieldTouched("step1.selectedCourse", true);
      }
    },
    [field, setFieldValue, setFieldTouched, validateField]
  );
};

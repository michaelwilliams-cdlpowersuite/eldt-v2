import { useFormikContext } from "formik";
import { useCallback } from "react";
import { Course } from "../utilities/products";

export const useSelectCourse = () => {
  const { values, setFieldValue, validateField, setFieldTouched } =
    useFormikContext<any>();

  return useCallback(
    (id: Course["id"]) => {
      const newValue = values.step1.selectedCourse === id ? "" : id;

      setFieldValue("step1.selectedCourse", newValue).then(() => {
        validateField("step1.selectedCourse");
      });

      if (values.step1.selectedCourse !== id) {
        setFieldTouched("step1.selectedCourse", true);
      }
    },
    [values, setFieldValue, validateField, setFieldTouched]
  );
};

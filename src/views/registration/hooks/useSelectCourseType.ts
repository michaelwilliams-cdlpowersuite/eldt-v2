import { useFormikContext } from "formik";
import { useCallback } from "react";
import { CourseType } from "../utilities/products";

export const useSelectCourseType = () => {
  const { values, setFieldValue, validateField, setFieldTouched } =
    useFormikContext<any>();

  return useCallback(
    (id: CourseType["id"]) => {
      const newValue = values.step4.selectedCourseType === id ? "" : id;

      setFieldValue("step4.selectedCourseType", newValue).then(() => {
        validateField("step4.selectedCourseType");
      });

      if (values.step4.selectedCourseType !== id) {
        setFieldTouched("step4.selectedCourseType", true);
      }
    },
    [values, setFieldValue, validateField, setFieldTouched]
  );
};

import { useFormikContext } from "formik";
import { useCallback } from "react";
import { CourseType } from "../utilities/products";

export const useSelectCourseType = () => {
  const { values, setFieldValue, validateField, setFieldTouched } =
    useFormikContext<any>();

  return useCallback(
    (courseType: CourseType) => {
      const isCurrentlySelected =
        values.step4.selectedCourseType?.id === courseType.id;

      const newValue = isCurrentlySelected ? null : courseType;

      setFieldValue("step4.selectedCourseType", newValue).then(() => {
        validateField("step4.selectedCourseType");
      });

      if (!isCurrentlySelected) {
        setFieldTouched("step4.selectedCourseType", true);
      }
    },
    [values, setFieldValue, validateField, setFieldTouched]
  );
};

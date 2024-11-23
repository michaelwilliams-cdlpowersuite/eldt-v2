import { useFormikContext } from "formik";
import { useCallback } from "react";

export const useSelectCourseType = () => {
  const { values, setFieldValue, validateField, setFieldTouched } =
    useFormikContext<any>();

  return useCallback(
    (courseType: any) => {
      const isCurrentlySelected =
        values.cart.selectedCourseType?.id === courseType.id;

      const newValue = isCurrentlySelected ? null : courseType;

      setFieldValue("cart.selectedCourseType", newValue).then(() => {
        validateField("cart.selectedCourseType");
      });

      if (!isCurrentlySelected) {
        setFieldTouched("cart.selectedCourseType", true);
      }
    },
    [values, setFieldValue, validateField, setFieldTouched]
  );
};

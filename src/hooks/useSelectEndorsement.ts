import { useFormikContext } from "formik";
import { useCallback } from "react";
import { Endorsement } from "../Registration/utilities/products";

export const useSelectEndorsement = () => {
  const { values, setFieldValue } = useFormikContext<any>();

  return useCallback(
    (id: Endorsement["id"]) => {
      const newSelections = values.step1.selectedEndorsements.includes(id)
        ? values.step1.selectedEndorsements.filter(
            (selectedId: string) => selectedId !== id
          )
        : [...values.step1.selectedEndorsements, id];

      setFieldValue("step1.selectedEndorsements", newSelections);
    },
    [values, setFieldValue]
  );
};

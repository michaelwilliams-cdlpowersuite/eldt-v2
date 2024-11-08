import { useFormikContext } from "formik";
import * as Yup from "yup";
import { validationSchema } from "./validationSchema";

const useValidateCurrentStep = () => {
  const { values } = useFormikContext<Record<string, any>>();

  const validateCurrentStep = async (stepKey: string) => {
    const stepSchema = Yup.reach(validationSchema, stepKey);
    if (stepSchema && "isValid" in stepSchema) {
      return await (stepSchema as Yup.AnySchema).isValid(values[stepKey]);
    }
    return false;
  };

  return validateCurrentStep;
};

export default useValidateCurrentStep;

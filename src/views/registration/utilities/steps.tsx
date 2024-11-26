import Step1 from "../Step1";
import Step2 from "../Step2";
import Step3 from "../Step3";

export const steps: StepProps[] = [
  { label: "Course Selection", component: Step1 },
  { label: "Personal Info", component: Step2 },
  { label: "Additional Info", component: Step3 },
];

interface StepProps {
  label: string;
  component: React.FC;
}

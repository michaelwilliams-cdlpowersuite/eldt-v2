import View1 from "../View1";
import View2 from "../View2";
import View3 from "../View3";

export const steps: StepProps[] = [
  { label: "Course Selection", component: View1 },
  { label: "Personal Info", component: View2 },
  { label: "Additional Details", component: View3 },
];

interface StepProps {
  label: string;
  component: React.FC;
}

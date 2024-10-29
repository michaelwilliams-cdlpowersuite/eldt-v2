import PersonalInfo from "./PersonalInfo";
import StepThree from "./StepThree";
import SelectClass from "./SelectClass";

export const steps: StepProps[] = [
  { label: "Select Class", component: SelectClass },
  { label: "Personal Info", component: PersonalInfo },
  { label: "Step 3", component: StepThree },
];

interface StepProps {
  label: string;
  component: React.FC;
}

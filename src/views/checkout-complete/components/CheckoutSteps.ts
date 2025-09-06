import Step2 from "../../registration/Step2";
import Step3 from "../../registration/Step3";

export const checkoutSteps: CheckoutStepProps[] = [
    { label: "Personal Info", component: Step2 },
    { label: "Additional Info", component: Step3 },
];

interface CheckoutStepProps {
    label: string;
    component: React.FC;
}

import CheckoutStep2 from "./CheckoutStep2";
import CheckoutStep3 from "./CheckoutStep3";

export const checkoutSteps: CheckoutStepProps[] = [
    { label: "Personal Info", component: CheckoutStep2 },
    { label: "Additional Info", component: CheckoutStep3 },
];

interface CheckoutStepProps {
    label: string;
    component: React.FC;
}

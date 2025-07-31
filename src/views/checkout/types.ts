export interface Product {
    id: number;
    sku: string;
    title: string;
    shortDescription: string;
    longDescription?: string;
    price: number;
    type: 'course' | 'theory' | 'endorsement' | 'custom_unit';
    forCourse?: string;
    uiOptions?: {
        htmlTitle?: string;
        courseLabel?: string;
        isPopular?: boolean;
        icon?: string;
    };
    creditPrice?: number;
    creditPriceFormatted?: number;
    uniquePurchaseWithinCategory?: boolean;
    category?: string;
}

export interface Course {
    id: string
    title: string
    description: string
    icon: any
    isPopular?: boolean
    price?: number
}

export interface TheoryOption {
    id: string
    price: number
    title: string
    description: string
    icon: React.ReactNode
    videoId?: string
    imageUrl?: string
    isPopular?: boolean
    estimatedTime?: string
}

export interface Endorsement {
    id: string
    price: number
    title: string
    description: string
    htmlTitle?: string
    courseLabel?: string
}

export interface Step {
    number: number
    title: string
    description: string
}

export interface AccountDetails {
    name: string
    email: string
    password: string
}

export interface CheckoutState {
    currentStep: number
    selectedMainCourse: string
    selectedTheoryOption: string
    selectedEndorsements: Set<string>
    accountDetails: AccountDetails
    paymentMethod: string
}

export interface OptionCardProps {
    item: Course | TheoryOption;
    isSelected: boolean;
    onSelect: () => void;
    onPreview?: () => void;
}

export interface CheckboxOptionCardProps {
    item: Endorsement
    isSelected: boolean
    onToggle: () => void
    showDiscount?: boolean
    discountPercent?: number
}

export interface SummaryLineProps {
    label: string
    value: string
    isDiscount?: boolean
    isTotal?: boolean
    htmlTitle?: string
}

export interface InputProps {
    id?: string
    label?: string
    [key: string]: any
}

export interface ModernProgressBarProps {
    currentStepIndex: number
    totalSteps: number
    currentStepTitle: string
    currentStepDescription?: string
}

export interface StepProps {
    selected: string
    onSelect: (id: string) => void
    onPreview?: (videoId: string) => void
}

export interface Step3Props {
    selected: Set<string>
    onToggle: (id: string) => void
    selectedTheoryOption: string
}

export interface Step4Props {
    theoryOptionId: string
    theoryOption: TheoryOption | undefined
    selectedEndorsements: string[]
    discount: number
    total: number
    onUpgrade: () => void
    onPreview: () => void
}

export interface Step5Props {
    total: number
    accountDetails: AccountDetails
    setAccountDetails: (details: AccountDetails) => void
    paymentMethod: string
    setPaymentMethod: (method: string) => void
} 
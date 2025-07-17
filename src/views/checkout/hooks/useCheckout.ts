import { useState, useMemo } from 'react'
import type { CheckoutState, AccountDetails } from '../types'
import { DISCOUNT_PERCENT, PROCESSING_FEE_RATE, MAIN_COURSES } from '../constants'
import { useProducts } from './useProducts'
import {
    transformProductsToTheoryOptions,
    transformProductsToEndorsements
} from '../utilities/productTransformers'

export const useCheckout = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [selectedMainCourse, setSelectedMainCourse] = useState("")
    const [selectedTheoryOption, setSelectedTheoryOption] = useState("")
    const [selectedEndorsements, setSelectedEndorsements] = useState(new Set<string>())
    const [accountDetails, setAccountDetails] = useState<AccountDetails>({
        name: "",
        email: "",
        password: ""
    })
    const [paymentMethod, setPaymentMethod] = useState("card")
    const [showVideoModal, setShowVideoModal] = useState(false)
    const [currentVideoId, setCurrentVideoId] = useState("")

    // Use static data for courses (Step 1)
    const courses = useMemo(() => {
        return MAIN_COURSES
    }, [])

    // Fetch products based on selected course
    const { data: products, isLoading, isError } = useProducts(selectedMainCourse)

    // Transform API data to component format for other steps
    const theoryOptions = useMemo(() => {
        return products ? transformProductsToTheoryOptions(products) : []
    }, [products])

    const endorsements = useMemo(() => {
        return products ? transformProductsToEndorsements(products) : []
    }, [products])

    // Calculation Logic
    const theoryPrice = useMemo(() => {
        return theoryOptions.find((o) => o.id === selectedTheoryOption)?.price || 0
    }, [selectedTheoryOption, theoryOptions])

    const endorsementsFullPrice = useMemo(() => {
        return Array.from(selectedEndorsements).reduce((sum, sku) => {
            const product = products?.find(p => p.sku === sku)
            return sum + (product ? product.price / 100 : 0)
        }, 0)
    }, [selectedEndorsements, products])

    const endorsementDiscount = useMemo(() => {
        return selectedTheoryOption === "theory-video" ? endorsementsFullPrice * (DISCOUNT_PERCENT / 100) : 0
    }, [selectedTheoryOption, endorsementsFullPrice])

    const endorsementsSubtotal = useMemo(() => {
        return endorsementsFullPrice - endorsementDiscount
    }, [endorsementsFullPrice, endorsementDiscount])

    const subtotal = useMemo(() => {
        return theoryPrice + endorsementsSubtotal
    }, [theoryPrice, endorsementsSubtotal])

    const processingFee = useMemo(() => {
        return subtotal > 0 ? subtotal * PROCESSING_FEE_RATE : 0
    }, [subtotal])

    const total = useMemo(() => {
        return subtotal + processingFee
    }, [subtotal, processingFee])

    const handleNext = () => {
        if (currentStep === 1 && selectedMainCourse === "endorsement-only") {
            setCurrentStep(3) // Skip to step 3
        } else if (currentStep < 5) {
            setCurrentStep((s) => s + 1)
        }
    }

    const handleBack = () => {
        if (currentStep === 3 && selectedMainCourse === "endorsement-only") {
            setCurrentStep(1) // Go back to step 1
        } else if (currentStep > 1) {
            setCurrentStep((s) => s - 1)
        }
    }

    const openVideoModal = (videoId: string) => {
        setCurrentVideoId(videoId)
        setShowVideoModal(true)
    }

    const closeVideoModal = () => {
        setShowVideoModal(false)
        setCurrentVideoId("")
    }

    const toggleEndorsement = (id: string) => {
        const newSet = new Set(selectedEndorsements)
        if (newSet.has(id)) {
            newSet.delete(id)
        } else {
            newSet.add(id)
        }
        setSelectedEndorsements(newSet)
    }

    const isNextDisabled = () => {
        if (currentStep === 1 && !selectedMainCourse) return true
        if (currentStep === 2 && !selectedTheoryOption) return true
        if (currentStep === 5) {
            const { name, email, password } = accountDetails
            return !name || !email || !password
        }
        return false
    }

    return {
        // API State
        products,
        isLoading,
        isError,

        // Data
        courses,
        theoryOptions,
        endorsements,

        // State
        currentStep,
        selectedMainCourse,
        selectedTheoryOption,
        selectedEndorsements,
        accountDetails,
        paymentMethod,
        showVideoModal,
        currentVideoId,

        // Calculations
        theoryPrice,
        endorsementsFullPrice,
        endorsementDiscount,
        endorsementsSubtotal,
        subtotal,
        processingFee,
        total,

        // Actions
        setSelectedMainCourse,
        setSelectedTheoryOption,
        setAccountDetails,
        setPaymentMethod,
        toggleEndorsement,
        handleNext,
        handleBack,
        openVideoModal,
        closeVideoModal,
        isNextDisabled,
    }
} 
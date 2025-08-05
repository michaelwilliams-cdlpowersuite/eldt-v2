import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import type { CheckoutState, AccountDetails } from '../types'
import { DISCOUNT_PERCENT, PROCESSING_FEE_RATE, MAIN_COURSES } from '../constants'
import { useProducts } from './useProducts'
import { useCheckoutSession } from './useCheckoutSession'
import { useGuestSession } from './useGuestSession'
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
    const [existingClientSecret, setExistingClientSecret] = useState<string | null>(null)
    const [hasUserSelectedTheory, setHasUserSelectedTheory] = useState(false)
    const [hasUserSelectedEndorsements, setHasUserSelectedEndorsements] = useState(false)

    // Guest session management
    const { session: guestSession, updateMetadata } = useGuestSession()

    // Debounce metadata updates
    const lastUpdateRef = useRef<number>(0)
    const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const previousStateRef = useRef<{
        step: number;
        course: string;
        theory: string;
        endorsements: string[];
    } | null>(null)

    // Use static data for courses (Step 1)
    const courses = useMemo(() => {
        return MAIN_COURSES
    }, [])

    // Fetch products based on selected course
    const { data: products, isLoading, isError } = useProducts(selectedMainCourse)

    // Checkout session mutation
    const checkoutSessionMutation = useCheckoutSession()

    // Transform API data to component format for other steps
    const theoryOptions = useMemo(() => {
        return products ? transformProductsToTheoryOptions(products) : []
    }, [products])

    const endorsements = useMemo(() => {
        return products ? transformProductsToEndorsements(products) : []
    }, [products])

    // Debounced metadata update function
    const debouncedUpdateMetadata = useCallback((metadata: Record<string, any>) => {
        const now = Date.now()
        const timeSinceLastUpdate = now - lastUpdateRef.current

        // Clear existing timeout
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current)
        }

        // Only update if at least 2 seconds have passed since last update
        if (timeSinceLastUpdate < 2000) {
            updateTimeoutRef.current = setTimeout(() => {
                if (guestSession) {
                    updateMetadata(metadata).catch(console.error)
                    lastUpdateRef.current = Date.now()
                }
            }, 2000 - timeSinceLastUpdate)
        } else {
            if (guestSession) {
                updateMetadata(metadata).catch(console.error)
                lastUpdateRef.current = now
            }
        }
    }, [guestSession, updateMetadata])

    // Track checkout progress in guest session (only when meaningful changes occur)
    useEffect(() => {
        if (guestSession) {
            const currentState = {
                step: currentStep,
                course: selectedMainCourse,
                theory: selectedTheoryOption,
                endorsements: Array.from(selectedEndorsements)
            }

            const previousState = previousStateRef.current

            // Only update if there's a meaningful change
            const hasChanged = !previousState ||
                previousState.step !== currentState.step ||
                previousState.course !== currentState.course ||
                previousState.theory !== currentState.theory ||
                JSON.stringify(previousState.endorsements) !== JSON.stringify(currentState.endorsements)

            if (hasChanged) {
                previousStateRef.current = currentState

                debouncedUpdateMetadata({
                    last_page: `checkout_step_${currentStep}`,
                    checkout_progress: {
                        step: currentStep,
                        selected_course: selectedMainCourse,
                        selected_theory: selectedTheoryOption,
                        selected_endorsements: Array.from(selectedEndorsements),
                        timestamp: new Date().toISOString()
                    }
                })
            }
        }
    }, [currentStep, selectedMainCourse, selectedTheoryOption, selectedEndorsements, guestSession, debouncedUpdateMetadata])

    // Separate effect for endorsements to avoid excessive updates
    useEffect(() => {
        if (guestSession && selectedEndorsements.size > 0) {
            const currentEndorsements = Array.from(selectedEndorsements)
            const lastEndorsements = guestSession.metadata?.selected_endorsements || []

            // Only update if endorsements have actually changed
            if (JSON.stringify(currentEndorsements) !== JSON.stringify(lastEndorsements)) {
                debouncedUpdateMetadata({
                    selected_endorsements: currentEndorsements
                })
            }
        }
    }, [selectedEndorsements, guestSession, debouncedUpdateMetadata])

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (updateTimeoutRef.current) {
                clearTimeout(updateTimeoutRef.current)
            }
        }
    }, [])

    // Prepare selected products for checkout session
    const selectedProducts = useMemo(() => {
        const selectedProductsArray: Array<{ sku: string; quantity: number }> = []

        // Add theory option if selected (only one theory option allowed)
        if (selectedTheoryOption && products) {
            const theoryProduct = products.find(p => {
                const isVideoVersion = p.sku.includes('master')
                const theoryType = isVideoVersion ? 'video' : 'reading'
                return theoryType === selectedTheoryOption && p.uniquePurchaseWithinCategory
            })
            if (theoryProduct) {
                selectedProductsArray.push({ sku: theoryProduct.sku, quantity: 1 })
            }
        }

        // Add selected endorsements
        selectedEndorsements.forEach(sku => {
            selectedProductsArray.push({ sku, quantity: 1 })
        })

        return selectedProductsArray
    }, [selectedMainCourse, selectedTheoryOption, selectedEndorsements, products])

    // Create checkout session (reuse existing if available)
    const createCheckoutSession = async () => {
        if (selectedProducts.length === 0) {
            throw new Error("No products selected")
        }

        // If we have an existing client secret, return it
        if (existingClientSecret) {
            return { clientSecret: existingClientSecret }
        }

        // Track checkout attempt in guest session (immediate, not debounced)
        if (guestSession) {
            updateMetadata({
                checkout_attempted_at: new Date().toISOString(),
                selected_products: selectedProducts
            }).catch(console.error);
        }

        const result = await checkoutSessionMutation.mutateAsync({
            products: selectedProducts
        })

        // Update existing client secret
        if (result.clientSecret) {
            setExistingClientSecret(result.clientSecret)
        }

        return result
    }

    // Calculation Logic
    const theoryPrice = useMemo(() => {
        return theoryOptions.find((o) => o.id === selectedTheoryOption)?.price || 0
    }, [selectedTheoryOption, theoryOptions])

    const endorsementsFullPrice = useMemo(() => {
        return Array.from(selectedEndorsements).reduce((sum, sku) => {
            const product = products?.find(p => p.sku === sku)
            // Only apply discount to endorsements and custom_units, not courses
            return sum + (product ? product.price / 100 : 0)
        }, 0)
    }, [selectedEndorsements, products])

    const endorsementDiscount = useMemo(() => {
        if (selectedTheoryOption !== "video") return 0

        // Calculate discount only for endorsements and custom_units
        const discountableProducts = Array.from(selectedEndorsements).reduce((sum, sku) => {
            const product = products?.find(p => p.sku === sku)
            // Only apply discount to endorsements and custom_units
            if (product && (product.type === 'endorsement' || product.type === 'custom_unit')) {
                return sum + (product.price / 100)
            }
            return sum
        }, 0)

        return discountableProducts * (DISCOUNT_PERCENT / 100)
    }, [selectedTheoryOption, selectedEndorsements, products])

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
        console.log('toggleEndorsement called with id:', id)
        console.log('Current step before toggle:', currentStep)
        console.log('Current endorsements before toggle:', Array.from(selectedEndorsements))

        const newSet = new Set(selectedEndorsements)
        if (newSet.has(id)) {
            newSet.delete(id)
            console.log('User removed endorsement:', id)
        } else {
            newSet.add(id)
            console.log('User added endorsement:', id)
        }

        console.log('New endorsements after toggle:', Array.from(newSet))
        setSelectedEndorsements(newSet)
        setHasUserSelectedEndorsements(true)

        console.log('hasUserSelectedEndorsements set to true')
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

    const setSelectedMainCourseWithInteraction = (course: string) => {
        console.log('User selected course:', course)
        setSelectedMainCourse(course)
    }

    const setSelectedTheoryOptionWithInteraction = (theory: string) => {
        console.log('User selected theory option:', theory)
        // Toggle the selection: if the same theory is clicked again, deselect it
        if (selectedTheoryOption === theory) {
            setSelectedTheoryOption("")
            setHasUserSelectedTheory(false)
        } else {
            setSelectedTheoryOption(theory)
            setHasUserSelectedTheory(true)
        }
    }

    const setAccountDetailsWithInteraction = (details: AccountDetails) => {
        setAccountDetails(details)
    }

    const setPaymentMethodWithInteraction = (method: string) => {
        setPaymentMethod(method)
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
        selectedProducts,

        // State
        currentStep,
        selectedMainCourse,
        selectedTheoryOption,
        selectedEndorsements,
        accountDetails,
        paymentMethod,
        showVideoModal,
        currentVideoId,
        existingClientSecret,

        // Calculations
        theoryPrice,
        endorsementsFullPrice,
        endorsementDiscount,
        endorsementsSubtotal,
        subtotal,
        processingFee,
        total,

        // Actions
        setSelectedMainCourse: setSelectedMainCourseWithInteraction,
        setSelectedTheoryOption: setSelectedTheoryOptionWithInteraction,
        setAccountDetails: setAccountDetailsWithInteraction,
        setPaymentMethod: setPaymentMethodWithInteraction,
        toggleEndorsement,
        handleNext,
        handleBack,
        openVideoModal,
        closeVideoModal,
        isNextDisabled,
        createCheckoutSession,
        checkoutSessionMutation,
    }
} 
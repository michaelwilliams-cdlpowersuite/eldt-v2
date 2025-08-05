import React from 'react'
import {
    Box,
    Container,
    Paper,
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Dialog,
    DialogContent,
    CircularProgress,
} from '@mui/material'
import { ChevronLeft, X } from 'lucide-react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { ReactComponent as Logo } from '../../assets/eldt_white.svg'
import { useCheckout } from './hooks/useCheckout'
import { STEPS } from './constants'
import { Step1_MainCourse } from './steps/Step1_MainCourse'
import { Step2_Theory } from './steps/Step2_Theory'
import { Step3_Endorsements } from './steps/Step3_Endorsements'
import { Step4_UpgradeSave } from './steps/Step4_UpgradeSave'
import { Step5_Payment } from './steps/Step5_Payment'
import { ModernProgressBar } from './components/ModernProgressBar'

export const CheckoutApp: React.FC = () => {
    const {
        currentStep,
        selectedMainCourse,
        selectedTheoryOption,
        selectedEndorsements,
        accountDetails,
        paymentMethod,
        showVideoModal,
        currentVideoId,
        theoryPrice,
        endorsementDiscount,
        total,
        courses,
        theoryOptions,
        endorsements,
        products,
        isLoading,
        isError,
        existingClientSecret,
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
        createCheckoutSession,
        checkoutSessionMutation,
    } = useCheckout()

    // Show loading state only for step 2 when waiting for theory options
    if (isLoading && currentStep === 2) {
        return (
            <Box sx={{
                minHeight: '100vh',
                bgcolor: 'grey.50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <CircularProgress />
            </Box>
        )
    }

    // Show error state if API call failed and we're on step 2
    if (isError && currentStep === 2) {
        return (
            <Box sx={{
                minHeight: '100vh',
                bgcolor: 'grey.50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography variant="h6" color="error">
                    Failed to load course options. Please try again later.
                </Typography>
            </Box>
        )
    }

    const getStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1_MainCourse
                        selected={selectedMainCourse}
                        onSelect={setSelectedMainCourse}
                    />
                )
            case 2:
                return (
                    <Step2_Theory
                        selected={selectedTheoryOption}
                        onSelect={setSelectedTheoryOption}
                        onPreview={openVideoModal}
                        theoryOptions={theoryOptions}
                    />
                )
            case 3:
                return (
                    <Step3_Endorsements
                        selected={selectedEndorsements}
                        selectedTheoryOption={selectedTheoryOption}
                        onToggle={toggleEndorsement}
                        products={products || []}
                    />
                )
            case 4:
                return (
                    <Step4_UpgradeSave
                        theoryOptionId={selectedTheoryOption}
                        theoryOption={theoryOptions.find(o => o.id === selectedTheoryOption)}
                        selectedEndorsements={Array.from(selectedEndorsements)}
                        discount={endorsementDiscount}
                        total={total}
                        onUpgrade={() => setSelectedTheoryOption("video")}
                        onPreview={() => openVideoModal("l4Qx4Z4JmLM")}
                        products={products}
                    />
                )
            case 5:
                return (
                    <Step5_Payment
                        total={total}
                        accountDetails={accountDetails}
                        setAccountDetails={setAccountDetails}
                        paymentMethod={paymentMethod}
                        setPaymentMethod={setPaymentMethod}
                        createCheckoutSession={createCheckoutSession}
                        checkoutSessionMutation={checkoutSessionMutation}
                    />
                )
            default:
                return null
        }
    }

    const stepsToRender = STEPS.filter((step) => !(selectedMainCourse === "endorsement-only" && step.number === 2))
    const currentStepInfo =
        stepsToRender.find((s) => s.number === currentStep) ||
        stepsToRender.find((s) => s.number > currentStep) ||
        stepsToRender[stepsToRender.length - 1]
    const currentStepIndex = stepsToRender.findIndex((s) => s.number === currentStepInfo.number)

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
            {/* Blue Header */}
            <AppBar position="fixed" elevation={0} sx={{ bgcolor: "#0E537B" }}>
                <Toolbar>
                    <Container
                        maxWidth="lg"
                        disableGutters
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box display="flex" alignItems="center">
                            <Logo style={{ height: "40px" }} />
                        </Box>
                        <Box display="flex" alignItems="center">
                            <LocalPhoneIcon sx={{ color: 'white' }} />
                            <Box>
                                <a
                                    href="tel:+15092413987"
                                    style={{ textDecoration: "none", color: "white" }}
                                >
                                    <Typography variant="overline" sx={{ pl: 1, whiteSpace: "nowrap", fontWeight: 'bold' }}>
                                        (509) 241-3987
                                    </Typography>
                                </a>
                                <Typography variant="caption" sx={{ pl: 1, whiteSpace: "nowrap", color: 'rgba(255,255,255,0.8)', display: 'block', lineHeight: 0.8 }}>
                                    Need help? Call us!
                                </Typography>
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>

            {/* Main Content */}
            <Box sx={{ pt: 9, pb: 10 }}>
                <Container maxWidth="lg">
                    {/* Progress Bar */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: 2,
                            mb: 2,
                            bgcolor: 'white',
                            borderRadius: 2,
                        }}
                    >
                        <ModernProgressBar
                            currentStepIndex={currentStepIndex}
                            totalSteps={stepsToRender.length}
                            currentStepTitle={currentStepInfo.title}
                            currentStepDescription={currentStepInfo.description}
                        />
                    </Paper>

                    {/* Step Content */}
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 2, sm: 3 },
                            bgcolor: 'white',
                            borderRadius: 2,
                            minHeight: '50vh',
                        }}
                    >
                        {getStepContent()}
                    </Paper>
                </Container>
            </Box>

            {/* Fixed Bottom Navigation */}
            <Paper
                elevation={8}
                sx={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1100,
                    borderRadius: 0,
                    borderTop: 1,
                    borderColor: 'divider',
                }}
            >
                <Container maxWidth="lg">
                    <Box sx={{
                        py: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                    }}>
                        {/* Back Button */}
                        {currentStep > 1 ? (
                            <Button
                                onClick={handleBack}
                                startIcon={<ChevronLeft size={18} />}
                                variant="outlined"
                                color="inherit"
                                sx={{
                                    fontWeight: 'bold',
                                    minWidth: { xs: 'auto', sm: 120 },
                                    px: { xs: 2, sm: 3 },
                                }}
                            >
                                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                    Back
                                </Box>
                            </Button>
                        ) : (
                            <Box />
                        )}

                        {/* Desktop step dots */}
                        <Box sx={{
                            display: { xs: 'none', sm: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center',
                        }}>
                            {stepsToRender.map((step, index) => (
                                <Box
                                    key={step.number}
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: '50%',
                                        bgcolor: index <= currentStepIndex ? '#00C058' : 'grey.300',
                                        transition: 'all 0.2s ease-in-out',
                                    }}
                                />
                            ))}
                        </Box>

                        {/* Next Button */}
                        {currentStep < 5 && (
                            <Box sx={{ textAlign: 'right' }}>
                                <Button
                                    onClick={handleNext}
                                    disabled={isNextDisabled()}
                                    variant="contained"
                                    sx={{
                                        fontWeight: 'bold',
                                        minWidth: { xs: 'auto', sm: 140 },
                                        px: { xs: 3, sm: 4 },
                                        py: 1.5,
                                        borderRadius: 2,
                                        backgroundColor: '#00C058',
                                        '&:hover': {
                                            backgroundColor: '#00a048',
                                        },
                                        '&:disabled': {
                                            backgroundColor: 'grey.300',
                                        }
                                    }}
                                >
                                    <>
                                        <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                                            Continue
                                        </Box>
                                        <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                                            →
                                        </Box>
                                    </>
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Container>
            </Paper>

            {/* Video Modal */}
            <Dialog
                open={showVideoModal}
                onClose={closeVideoModal}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: 'black',
                        borderRadius: 2,
                    }
                }}
            >
                <DialogContent sx={{ p: 0, position: 'relative' }}>
                    <IconButton
                        onClick={closeVideoModal}
                        sx={{
                            position: 'absolute',
                            top: -12,
                            right: -12,
                            bgcolor: 'black',
                            color: 'white',
                            zIndex: 10,
                            '&:hover': {
                                bgcolor: 'grey.800',
                            }
                        }}
                    >
                        <X size={20} />
                    </IconButton>
                    <Box sx={{ aspectRatio: '16/9' }}>
                        <Box
                            component="iframe"
                            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`}
                            sx={{
                                width: '100%',
                                height: '100%',
                                border: 'none',
                                borderRadius: 1,
                            }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </Box>
                </DialogContent>
            </Dialog>
        </Box>
    )
} 

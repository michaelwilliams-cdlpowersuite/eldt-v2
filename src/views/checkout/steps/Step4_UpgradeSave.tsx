import React from 'react'
import {
    Stack,
    Typography,
    Paper,
    Button,
    Box,
    Divider,
} from '@mui/material'
import { PlayCircle, Film } from 'lucide-react'
import { SummaryLine } from '../components/SummaryLine'
import { MIN_ORDER_FOR_PAYMENT_PLANS } from '../constants'
import type { Step4Props, Product } from '../types'

interface Step4PropsExtended extends Step4Props {
    products?: Product[];
}

export const Step4_UpgradeSave: React.FC<Step4PropsExtended> = ({
    theoryOptionId,
    theoryOption,
    selectedEndorsements,
    discount,
    total,
    onUpgrade,
    onPreview,
    products,
}) => {
    const videoCourse = theoryOption

    return (
        <Stack spacing={3}>
            <Typography variant="h6" color="text.primary">
                Upgrade & Save
            </Typography>

            {theoryOptionId === "reading" && selectedEndorsements.length > 0 && (
                <Paper
                    sx={{
                        p: 3,
                        bgcolor: 'grey.100',
                        borderLeft: 4,
                        borderColor: 'primary.main',
                        borderRadius: '0 8px 8px 0',
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                        Upgrade to the Video Master Course!
                    </Typography>
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={2}
                        alignItems={{ xs: 'center', md: 'flex-start' }}
                        sx={{ mt: 2 }}
                    >
                        <Box
                            sx={{
                                position: 'relative',
                                width: { xs: 120, md: 96 },
                                height: { xs: 67.5, md: 54 }, // 16:9 aspect ratio
                                borderRadius: 1,
                                overflow: 'hidden',
                                flexShrink: 0,
                            }}
                        >
                            <Box
                                component="img"
                                src={videoCourse?.imageUrl}
                                alt="Video Course Thumbnail"
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                                onError={(e: any) => {
                                    // Fallback to a custom placeholder
                                    e.target.style.display = 'none'
                                    e.target.nextSibling.style.display = 'flex'
                                }}
                            />
                            {/* Fallback placeholder */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    display: 'none',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    bgcolor: 'grey.200',
                                    flexDirection: 'column',
                                    gap: 0.5,
                                }}
                            >
                                <Film size={20} color="#666" />
                                <Typography variant="caption" color="text.secondary" fontSize="0.6rem" textAlign="center">
                                    Video
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Switch to video learning and save 10% on all your endorsements!
                            </Typography>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={1}
                                justifyContent={{ xs: 'center', md: 'flex-start' }}
                            >
                                <Button
                                    onClick={onUpgrade}
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    sx={{ fontWeight: 'bold', minWidth: { xs: '200px', sm: 'auto' } }}
                                >
                                    Upgrade to Video & Save
                                </Button>
                                <Button
                                    onClick={onPreview}
                                    variant="outlined"
                                    color="inherit"
                                    size="small"
                                    startIcon={<PlayCircle size={16} />}
                                    sx={{ fontWeight: 'bold', minWidth: { xs: '200px', sm: 'auto' } }}
                                >
                                    Preview
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
                </Paper>
            )}

            {theoryOptionId === "video" && (
                <Paper
                    sx={{
                        p: 3,
                        bgcolor: 'success.light',
                        borderLeft: 4,
                        borderColor: 'success.main',
                        borderRadius: '0 8px 8px 0',
                    }}
                >
                    <Typography variant="h6" fontWeight="bold" color="success.dark" gutterBottom>
                        Video Course Discount Unlocked!
                    </Typography>
                    {discount > 0 ? (
                        <Typography variant="body2" color="success.dark">
                            Because you bundled the Video Master Course with endorsements, you've saved{' '}
                            <Typography component="span" fontWeight="bold">10%</Typography> on all
                            your selected endorsements!
                        </Typography>
                    ) : (
                        <Typography variant="body2" color="success.dark">
                            You've selected the Video Master Course. Go back and add any endorsement to save{' '}
                            <Typography component="span" fontWeight="bold">10%</Typography> on
                            your endorsement package.
                        </Typography>
                    )}
                </Paper>
            )}

            <Paper sx={{ p: 3, bgcolor: 'grey.50', border: 1, borderColor: 'grey.300' }}>
                <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
                    Your Package Summary:
                </Typography>
                <Stack spacing={0.5}>
                    {theoryOption && <SummaryLine label={theoryOption.title} value={`$${theoryOption.price.toFixed(2)}`} />}
                    {selectedEndorsements.map((productSku) => {
                        const product = products?.find(p => p.sku === productSku)
                        return product ? (
                            <SummaryLine
                                key={product.sku}
                                label={product.uiOptions?.htmlTitle || product.title}
                                value={`$${(product.price / 100).toFixed(2)}`}
                                htmlTitle={product.uiOptions?.htmlTitle}
                            />
                        ) : null
                    })}
                    {discount > 0 && (
                        <SummaryLine label="Video Course Discount (10%)" value={`-$${discount.toFixed(2)}`} isDiscount />
                    )}
                </Stack>
                <Divider sx={{ my: 2 }} />
                <SummaryLine label="Total" value={`$${total.toFixed(2)}`} isTotal />
            </Paper>

            {total > 0 && total < MIN_ORDER_FOR_PAYMENT_PLANS && (
                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                        bgcolor: 'info.light',
                        border: 2,
                        borderColor: 'info.main',
                        borderRadius: 2,
                        background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                    }}
                >
                    <Stack spacing={1} alignItems="center" textAlign="center">
                        <Typography variant="body1" color="info.dark" fontWeight="medium">
                            💳 <Typography component="span" fontWeight="bold">Buy Now, Pay Later</Typography> Available!
                        </Typography>
                        <Typography variant="body2" color="info.dark">
                            Spend{' '}
                            <Typography component="span" fontWeight="bold" color="primary.main">
                                ${(MIN_ORDER_FOR_PAYMENT_PLANS - total).toFixed(2)}
                            </Typography>{' '}
                            more to qualify for flexible payments.
                        </Typography>
                        <Typography variant="body2" color="info.dark" sx={{ opacity: 0.9 }}>
                            Payments as low as <Typography component="span" fontWeight="bold">$25/month</Typography> for 6 months.
                        </Typography>
                    </Stack>
                </Paper>
            )}
        </Stack>
    )
} 

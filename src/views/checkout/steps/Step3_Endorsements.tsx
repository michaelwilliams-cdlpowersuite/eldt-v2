import React, { useMemo } from 'react'
import { Stack, Typography, Paper, Box, Divider } from '@mui/material'
import { CheckboxOptionCard } from '../components/CheckboxOptionCard'
import { DISCOUNT_PERCENT } from '../constants'
import type { Product } from '../types'

interface Step3Props {
    selected: Set<string>
    onToggle: (id: string) => void
    selectedTheoryOption: string
    products: Product[]
}

export const Step3_Endorsements: React.FC<Step3Props> = ({
    selected,
    onToggle,
    selectedTheoryOption,
    products,
}) => {
    const hasVideoDiscount = selectedTheoryOption === 'video'

    // Check if there are any discountable products (endorsements or custom_units)
    const hasDiscountableProducts = useMemo(() => {
        return Array.from(selected).some(sku => {
            const product = products?.find(p => p.sku === sku)
            return product && (product.type === 'endorsement' || product.type === 'custom_unit')
        })
    }, [selected, products])

    // Group products by category, excluding course type
    const groupedProducts = useMemo(() => {
        const groups: Record<string, Product[]> = {}

        products
            .filter(product => product.type !== 'course')
            .forEach(product => {
                const category = product.category || 'Other'
                if (!groups[category]) {
                    groups[category] = []
                }
                groups[category].push(product)
            })

        // Sort categories to put "Endorsements" first
        const sortedEntries = Object.entries(groups).sort(([a], [b]) => {
            if (a.toLowerCase().includes('endorsement')) return -1
            if (b.toLowerCase().includes('endorsement')) return 1
            return a.localeCompare(b)
        })

        return Object.fromEntries(sortedEntries)
    }, [products])

    return (
        <Stack spacing={3}>
            <Stack spacing={1} sx={{ mb: 1 }}>
                <Typography variant="h6" color="text.primary">
                    Want to earn more? Add extras
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    These help you get better jobs. You can skip and add later.
                </Typography>
            </Stack>
            {hasVideoDiscount && hasDiscountableProducts && (
                <Paper
                    sx={{
                        p: 2,
                        bgcolor: 'success.light',
                        borderLeft: 4,
                        borderColor: 'success.main',
                        borderRadius: '0 8px 8px 0',
                    }}
                >
                    <Typography variant="body1" fontWeight="bold" color="success.dark">
                        🎉 Video Bonus: Save 10%!
                    </Typography>
                    <Typography variant="body2" color="success.dark">
                        You picked videos, so extras cost less.
                    </Typography>
                </Paper>
            )}

            {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                <Box key={category}>
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="text.primary"
                        sx={{ mb: 2, mt: 3 }}
                    >
                        {category}
                    </Typography>
                    <Stack spacing={2}>
                        {categoryProducts.map((product) => (
                            <CheckboxOptionCard
                                key={product.sku}
                                item={{
                                    id: product.sku,
                                    price: product.price / 100,
                                    title: product.uiOptions?.htmlTitle || product.title,
                                    description: product.shortDescription,
                                    htmlTitle: product.uiOptions?.htmlTitle,
                                    courseLabel: product.uiOptions?.courseLabel,
                                }}
                                isSelected={selected.has(product.sku)}
                                onToggle={() => onToggle(product.sku)}
                                showDiscount={hasVideoDiscount && (product.type === 'endorsement' || product.type === 'custom_unit')}
                                discountPercent={DISCOUNT_PERCENT}
                            />
                        ))}
                    </Stack>
                    {category !== Object.keys(groupedProducts)[Object.keys(groupedProducts).length - 1] && (
                        <Divider sx={{ mt: 3, mb: 1 }} />
                    )}
                </Box>
            ))}
        </Stack>
    )
} 

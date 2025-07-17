import React from 'react'
import { Stack, Typography, Paper } from '@mui/material'
import { CheckboxOptionCard } from '../components/CheckboxOptionCard'
import { ENDORSEMENTS, DISCOUNT_PERCENT } from '../constants'
import type { Step3Props } from '../types'

export const Step3_Endorsements: React.FC<Step3Props> = ({
    selected,
    onToggle,
    selectedTheoryOption,
}) => {
    const hasVideoDiscount = selectedTheoryOption === 'theory-video'

    return (
        <Stack spacing={3}>
            <Stack spacing={1} sx={{ mb: 1 }}>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                    Want to earn more? Add extras
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    These help you get better jobs. You can skip and add later.
                </Typography>
            </Stack>
            {hasVideoDiscount && (
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
            {ENDORSEMENTS.map((endorsement) => (
                <CheckboxOptionCard
                    key={endorsement.id}
                    item={endorsement}
                    isSelected={selected.has(endorsement.id)}
                    onToggle={() => onToggle(endorsement.id)}
                    showDiscount={hasVideoDiscount}
                    discountPercent={DISCOUNT_PERCENT}
                />
            ))}
        </Stack>
    )
} 
import React from 'react'
import { Stack, Typography } from '@mui/material'
import { OptionCard } from '../components/OptionCard'
import { THEORY_OPTIONS } from '../constants'
import type { StepProps, TheoryOption } from '../types'

export const Step2_Theory: React.FC<StepProps> = ({
    selected,
    onSelect,
    onPreview,
}) => {
    const options: TheoryOption[] = THEORY_OPTIONS;
    return (
        <Stack spacing={3}>
            <Stack spacing={1} sx={{ mb: 1 }}>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                    How do you learn?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Both work the same. Pick what you like!
                    <Typography component="span" sx={{ color: 'success.main', fontWeight: 'bold', ml: 1 }}>
                        ✓ Government Approved
                    </Typography>
                </Typography>
            </Stack>
            {options.map((option) => (
                <OptionCard
                    key={option.id}
                    item={option as TheoryOption}
                    isSelected={selected === option.id}
                    onSelect={() => onSelect(option.id)}
                    onPreview={option.videoId && onPreview ? () => onPreview(option.videoId!) : undefined}
                />
            ))}
        </Stack>
    )
} 
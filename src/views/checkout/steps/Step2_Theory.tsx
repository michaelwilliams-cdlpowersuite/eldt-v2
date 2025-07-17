import React from 'react'
import { Stack, Typography } from '@mui/material'
import { OptionCard } from '../components/OptionCard'
import type { TheoryOption } from '../types'

interface Step2Props {
    selected: string
    onSelect: (id: string) => void
    onPreview?: (videoId: string) => void
    theoryOptions: TheoryOption[]
}

export const Step2_Theory: React.FC<Step2Props> = ({
    selected,
    onSelect,
    onPreview,
    theoryOptions,
}) => {
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
            {theoryOptions.map((option) => (
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
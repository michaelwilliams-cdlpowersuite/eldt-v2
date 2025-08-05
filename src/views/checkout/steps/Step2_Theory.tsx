import React from 'react'
import { Stack, Typography, Grid2 } from '@mui/material'
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
                <Typography variant="h6" color="text.primary">
                    How do you learn?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Both work the same. Pick what you like!
                </Typography>
            </Stack>
            <Grid2 container spacing={2}>
                {theoryOptions.map((option) => (
                    <Grid2 size={{ xs: 12, sm: 6 }} key={option.id}>
                        <OptionCard
                            key={option.id}
                            item={option as TheoryOption}
                            isSelected={selected === option.id}
                            onSelect={() => onSelect(option.id)}
                            onPreview={option.videoId && onPreview ? () => onPreview(option.videoId!) : undefined}
                        />
                    </Grid2>
                ))}
            </Grid2>
        </Stack>
    )
} 

import React from 'react'
import { Box, LinearProgress, Typography } from '@mui/material'
import type { ModernProgressBarProps } from '../types'

export const ModernProgressBar: React.FC<ModernProgressBarProps> = ({
    currentStepIndex,
    totalSteps,
    currentStepTitle,
    currentStepDescription,
}) => {
    const progressPercentage = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                <Box>
                    <Typography variant="body2" fontWeight="bold" color="text.primary">
                        Step {currentStepIndex + 1} of {totalSteps}: {currentStepTitle}
                    </Typography>
                    {currentStepDescription && (
                        <Typography variant="caption" color="text.secondary">
                            {currentStepDescription}
                        </Typography>
                    )}
                </Box>
            </Box>
            <LinearProgress
                variant="determinate"
                value={progressPercentage}
                color="success"
                sx={{ height: 10, borderRadius: 1 }}
            />
        </Box>
    )
} 
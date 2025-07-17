import React from 'react'
import { Box, Typography } from '@mui/material'
import type { SummaryLineProps } from '../types'

export const SummaryLine: React.FC<SummaryLineProps> = ({
    label,
    value,
    isDiscount,
    isTotal,
}) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Typography
            variant={isTotal ? "h6" : "body1"}
            color={isDiscount ? "success.main" : "text.primary"}
            fontWeight={isTotal || isDiscount ? "bold" : "normal"}
        >
            {label}
        </Typography>
        <Typography
            variant={isTotal ? "h6" : "body1"}
            color="text.primary"
            fontWeight={isTotal ? "bold" : "normal"}
        >
            {value}
        </Typography>
    </Box>
) 
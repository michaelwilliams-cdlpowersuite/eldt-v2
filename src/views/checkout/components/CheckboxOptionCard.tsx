import React from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Checkbox,
    Stack,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import type { CheckboxOptionCardProps } from '../types'

export const CheckboxOptionCard: React.FC<CheckboxOptionCardProps> = ({
    item,
    isSelected,
    onToggle,
    showDiscount = false,
    discountPercent = 0,
}) => {
    const theme = useTheme()

    return (
        <Card
            onClick={onToggle}
            sx={{
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                border: 2,
                borderColor: isSelected ? theme.palette.success.main : 'grey.300',
                backgroundColor: isSelected ? theme.palette.success.light + '10' : 'white',
                borderRadius: 2,
                '&:hover': {
                    borderColor: isSelected ? theme.palette.success.main : 'grey.500',
                    boxShadow: theme.shadows[4],
                },
            }}
        >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Checkbox
                        checked={isSelected}
                        readOnly
                        color="success"
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        {item.htmlTitle ? (
                            <Typography
                                variant="h6"
                                component="h4"
                                fontWeight="bold"
                                color="text.primary"
                                sx={{ mb: 0.5 }}
                                dangerouslySetInnerHTML={{ __html: item.htmlTitle }}
                            />
                        ) : (
                            <Typography variant="h6" component="h4" fontWeight="bold" color="text.primary" sx={{ mb: 0.5 }}>
                                {item.title}
                            </Typography>
                        )}
                        {item.courseLabel && (
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                {item.courseLabel}
                            </Typography>
                        )}
                        <Typography variant="body2" color="text.secondary">
                            {item.description}
                        </Typography>
                        {showDiscount && (
                            <Box sx={{ mt: 0.5 }}>
                                <Typography variant="caption" color="success.main" fontWeight="bold">
                                    {discountPercent}% off with Video Course!
                                </Typography>
                            </Box>
                        )}
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                        {showDiscount ? (
                            <Stack alignItems="flex-end" spacing={0.25}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ textDecoration: 'line-through' }}
                                >
                                    ${item.price.toFixed(2)}
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="success.main">
                                    ${(item.price * (1 - discountPercent / 100)).toFixed(2)}
                                </Typography>
                            </Stack>
                        ) : (
                            <Typography variant="h6" fontWeight="bold" color="text.primary">
                                ${item.price.toFixed(2)}
                            </Typography>
                        )}
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
} 
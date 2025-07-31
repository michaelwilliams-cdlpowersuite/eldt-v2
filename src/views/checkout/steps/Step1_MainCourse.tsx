import React from 'react'
import { Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import { OptionCard } from '../components/OptionCard'
import { MAIN_COURSES } from '../constants'
import type { Course } from '../types'

interface Step1Props {
    selected: string
    onSelect: (id: string) => void
}

export const Step1_MainCourse: React.FC<Step1Props> = ({
    selected,
    onSelect,
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    // Reorder courses for mobile - put "Endorsement Only" first
    const orderedCourses: Course[] = isMobile
        ? [
            ...MAIN_COURSES.filter(course => course.id === 'Endorsements Only'),
            ...MAIN_COURSES.filter(course => course.id !== 'Endorsements Only')
        ]
        : MAIN_COURSES

    return (
        <Stack spacing={3}>
            <Stack spacing={1} sx={{ mb: 1 }}>
                <Typography variant="h6" color="text.primary">
                    Which type of CDL License do you need?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Pick what matches your goals. All approved by government.
                </Typography>
            </Stack>
            {orderedCourses.map((course) => (
                <OptionCard
                    key={course.id}
                    item={course as Course}
                    isSelected={selected === course.id}
                    onSelect={() => onSelect(course.id)}
                />
            ))}
        </Stack>
    )
} 

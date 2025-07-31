import React from 'react';
import { Box, Avatar } from '@mui/material';
import { Star, Film, BookOpen } from 'lucide-react';
import { ReactComponent as ClassA } from '../../assets/icons-05.svg';
import { ReactComponent as ClassB } from '../../assets/icons-07.svg';
import { ReactComponent as ClassBA } from '../../assets/icons-06.svg';
import type { Course, TheoryOption, Endorsement, Step } from './types';

export const MAIN_COURSES: Course[] = [
    {
        id: 'Class A',
        title: 'Class A',
        description: 'Drive 18-wheelers and make the most money',
        icon: <ClassA style={{ width: '60px', height: '60px', objectFit: 'contain' }} />,
        isPopular: true,
    },
    {
        id: 'Class B',
        title: 'Class B',
        description: 'Drive delivery trucks and buses',
        icon: <ClassB style={{ width: '60px', height: '60px', objectFit: 'contain' }} />,
    },
    {
        id: 'Class B-A',
        title: 'Class B-A Upgrade',
        description: 'Have Class B? Upgrade to Class A',
        icon: <ClassBA style={{ width: '60px', height: '60px', objectFit: 'contain' }} />,
    },
    {
        id: 'Endorsements Only',
        title: 'Endorsements Only',
        description: 'Already have your CDL? Just add endorsements',
        icon: (
            <Avatar
                sx={{
                    bgcolor: 'grey.200',
                    color: '#2C5F7C',
                    width: 60,
                    height: 60,
                }}
            >
                <Star size={32} />
            </Avatar>
        ),
    },
];

export const THEORY_OPTIONS: TheoryOption[] = [
    {
        id: 'video',
        price: 75,
        title: 'Watch Videos',
        description: 'Learn by watching. Easier to understand.',
        icon: (
            <Box
                component={Film}
                sx={{
                    display: 'inline-block',
                    width: 20,
                    height: 20,
                    ml: 0.5,
                    color: 'text.secondary',
                    verticalAlign: 'middle',
                }}
            />
        ),
        videoId: 'l4Qx4Z4JmLM',
        imageUrl: 'https://img.youtube.com/vi/l4Qx4Z4JmLM/mqdefault.jpg',
        isPopular: true,
        estimatedTime: '3-4 hours',
    },
    {
        id: 'reading',
        price: 50,
        title: 'Read Text',
        description: 'Learn by reading. Costs less.',
        icon: (
            <Box
                component={BookOpen}
                sx={{
                    display: 'inline-block',
                    width: 20,
                    height: 20,
                    ml: 0.5,
                    color: 'text.secondary',
                    verticalAlign: 'middle',
                }}
            />
        ),
        estimatedTime: '4-5 hours',
    },
];

export const ENDORSEMENTS: Endorsement[] = [
    { id: 'hazmat', price: 25, title: 'Hazmat', description: 'Carry chemicals. Get paid more!' },
    { id: 'permit-prep', price: 10, title: 'Written Test Help', description: 'Extra practice questions.' },
    { id: 'air-supply', price: 15, title: 'Air Brakes', description: 'Learn truck brakes. Most jobs need this.' },
    { id: 'skills-test', price: 35, title: 'Road Test Help', description: 'Practice driving skills.' },
    { id: 'tanker', price: 25, title: 'Tanker', description: 'Drive fuel trucks. Good pay.' },
];

export const STEPS: Step[] = [
    { number: 1, title: 'Pick Your License', description: 'What do you want to drive?' },
    { number: 2, title: 'How You Learn', description: 'Watch videos or read?' },
    { number: 3, title: 'Extra Training', description: 'Add more if you want' },
    { number: 4, title: 'Review', description: 'Check your order' },
    { number: 5, title: 'Pay', description: 'Complete your purchase to unlock your trucking career!' },
];

export const DISCOUNT_PERCENT = 10;
export const PROCESSING_FEE_RATE = 0.035;
export const MIN_ORDER_FOR_PAYMENT_PLANS = 150; 
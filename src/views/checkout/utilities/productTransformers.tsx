import React from 'react';
import { Box, Avatar } from '@mui/material';
import { Star, Film, BookOpen } from 'lucide-react';
import type { Product, TheoryOption } from '../types';

// Icon mapping for theory options
const THEORY_ICONS: Record<string, React.ReactNode> = {
    'video': (
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
    'reading': (
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
};

export const transformProductsToTheoryOptions = (products: Product[]): TheoryOption[] => {
    return products
        .filter(product => product.type === 'course')
        .map(product => {
            const isVideoVersion = product.sku.includes('master');
            const theoryType = isVideoVersion ? 'video' : 'reading';
            const iconType = isVideoVersion ? 'video' : 'reading';

            return {
                id: theoryType,
                price: product.price / 100, // Convert from cents to dollars
                title: product.uiOptions?.htmlTitle || product.title,
                description: product.shortDescription,
                icon: THEORY_ICONS[iconType] || THEORY_ICONS['video'], // fallback
                videoId: isVideoVersion ? 'l4Qx4Z4JmLM' : undefined, // Default video ID for video version
                imageUrl: isVideoVersion ? 'https://img.youtube.com/vi/l4Qx4Z4JmLM/mqdefault.jpg' : undefined,
                isPopular: product.uiOptions?.isPopular || false,
                estimatedTime: isVideoVersion ? '3-4 hours' : '4-5 hours',
            };
        });
};

export const transformProductsToEndorsements = (products: Product[]): any[] => {
    return products
        .filter(product => product.type === 'endorsement')
        .map(product => ({
            id: product.sku,
            price: product.price / 100, // Convert from cents to dollars
            title: product.uiOptions?.htmlTitle || product.title,
            description: product.shortDescription,
            htmlTitle: product.uiOptions?.htmlTitle, // Preserve raw HTML
        }));
}; 
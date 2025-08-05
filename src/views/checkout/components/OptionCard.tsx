import React from 'react'
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Radio,
    Stack,
    List,
    ListItem,
    ListItemIcon,
    Divider,
} from '@mui/material'
import { PlayCircle, Film } from 'lucide-react'
import { useTheme } from '@mui/material/styles'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import {
    DirectionsRun as DirectionsRunIcon,
    AccessTime as AccessTimeIcon,
    Verified as VerifiedIcon,
    AssuredWorkload as AssuredWorkloadIcon,
    Engineering as EngineeringIcon,
    ThumbUp as ThumbUpIcon,
    Devices as DevicesIcon,
    Save as SaveIcon,
    Star as StarIcon,
    LocalOffer as LocalOfferIcon
} from '@mui/icons-material'
import type { Course, TheoryOption } from '../types'

export const OptionCard = ({
    item,
    isSelected,
    onSelect,
    onPreview,
}: {
    item: Course | TheoryOption;
    isSelected: boolean;
    onSelect: () => void;
    onPreview?: () => void;
}) => {
    const theme = useTheme();

    return (
        <Card
            variant="outlined"
            onClick={onSelect}
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                border: isSelected ? `4px solid ${theme.palette.success.main}` : "1px solid primary.main",
            }}
        >
            <CardActionArea
                sx={{ display: "flex", flexDirection: "column", height: "100%", pb: 2 }}
                component="div"
            >
                <CardContent
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    {('imageUrl' in item && item.imageUrl) && onPreview ? (
                        // Layout for video courses - vertical on mobile, horizontal on desktop
                        <Stack spacing={2}>
                            {/* Price and title */}
                            <div>
                                <Typography variant="h6" textAlign="center">
                                    {(item as Course | TheoryOption).title}
                                </Typography>
                                {'price' in item && (
                                    <Typography variant="h3" textAlign="center">
                                        ${(item as TheoryOption).price}
                                    </Typography>
                                )}
                                {/* Description moved below price */}
                                <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mt: 1 }}>
                                    {(item as Course | TheoryOption).description}
                                </Typography>
                            </div>

                            {/* Video preview section - positioned after pricing */}
                            <Box sx={{ width: '100%' }}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: 0,
                                        paddingBottom: '56.25%', // 16:9 aspect ratio (9/16 = 0.5625)
                                        borderRadius: 2,
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        boxShadow: theme.shadows[4],
                                        '&:hover': {
                                            boxShadow: theme.shadows[8],
                                            transform: 'scale(1.01)',
                                            transition: 'all 0.2s ease-in-out',
                                        },
                                        '&:hover .play-overlay': {
                                            opacity: 1,
                                        },
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onPreview && onPreview()
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={(item as TheoryOption).imageUrl}
                                        alt="Course video thumbnail"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            display: 'block',
                                        }}
                                        onError={(e: any) => {
                                            // Fallback to a custom placeholder
                                            e.target.style.display = 'none'
                                            e.target.nextSibling.style.display = 'flex'
                                        }}
                                    />
                                    {/* Fallback placeholder */}
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'none',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: 'grey.200',
                                            flexDirection: 'column',
                                            gap: 1,
                                        }}
                                    >
                                        <Film size={32} color="#666" />
                                        <Typography variant="body2" color="text.secondary" textAlign="center">
                                            Video Course
                                        </Typography>
                                    </Box>
                                    {/* Play button overlay */}
                                    <Box
                                        className="play-overlay"
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            bgcolor: 'rgba(0, 0, 0, 0.6)',
                                            opacity: 0,
                                            transition: 'opacity 0.2s ease-in-out',
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                borderRadius: '50%',
                                                bgcolor: 'rgba(255, 255, 255, 0.95)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                boxShadow: theme.shadows[4],
                                            }}
                                        >
                                            <PlayCircle size={36} color="#333" />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onPreview && onPreview()
                                        }}
                                        startIcon={<PlayCircle size={16} />}
                                        sx={{
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            px: 2,
                                            py: 0.5,
                                            borderRadius: 1,
                                            textTransform: 'none',
                                        }}
                                    >
                                        Watch Preview
                                    </Button>
                                </Box>
                            </Box>

                            {/* Enhanced badges with ribbon design */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                                {('isPopular' in item && item.isPopular) && (
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            bgcolor: 'success.main',
                                            color: 'white',
                                            px: 2,
                                            py: 0.75,
                                            borderRadius: '0 8px 8px 0',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            boxShadow: theme.shadows[2],
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                left: -8,
                                                top: 0,
                                                width: 0,
                                                height: 0,
                                                borderStyle: 'solid',
                                                borderWidth: '0 8px 8px 0',
                                                borderColor: 'transparent',
                                                borderRightColor: 'success.dark',
                                            },
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                left: -8,
                                                bottom: 0,
                                                width: 0,
                                                height: 0,
                                                borderStyle: 'solid',
                                                borderWidth: '8px 8px 0 0',
                                                borderColor: 'transparent',
                                                borderTopColor: 'success.dark',
                                            },
                                        }}
                                    >
                                        <StarIcon sx={{ fontSize: 16 }} />
                                        Most Popular
                                    </Box>
                                )}
                                {('id' in item && item.id === 'video') && (
                                    <Box
                                        sx={{
                                            position: 'relative',
                                            bgcolor: '#ff9800',
                                            color: 'white',
                                            px: 2,
                                            py: 0.75,
                                            borderRadius: '0 8px 8px 0',
                                            fontSize: '0.75rem',
                                            fontWeight: 'bold',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 0.5,
                                            boxShadow: theme.shadows[2],
                                            '&::before': {
                                                content: '""',
                                                position: 'absolute',
                                                left: -8,
                                                top: 0,
                                                width: 0,
                                                height: 0,
                                                borderStyle: 'solid',
                                                borderWidth: '0 8px 8px 0',
                                                borderColor: 'transparent',
                                                borderRightColor: '#f57c00',
                                            },
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                left: -8,
                                                bottom: 0,
                                                width: 0,
                                                height: 0,
                                                borderStyle: 'solid',
                                                borderWidth: '8px 8px 0 0',
                                                borderColor: 'transparent',
                                                borderTopColor: '#f57c00',
                                            },
                                        }}
                                    >
                                        <LocalOfferIcon sx={{ fontSize: 16 }} />
                                        Unlock 10% Off Endorsements
                                    </Box>
                                )}
                            </Box>

                            {('id' in item && item.id === 'reading') && (
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', fontStyle: 'italic' }}>
                                    Save $25 vs Video Course (but miss out on 10% endorsement discount)
                                </Typography>
                            )}

                            {/* Benefits section for theory options */}
                            <List>
                                {('id' in item && item.id === 'video') ? (
                                    // Video course benefits
                                    <>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <DirectionsRunIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Self-Paced</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <AccessTimeIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Available 24/7</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <VerifiedIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Includes certificate of completion</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <AssuredWorkloadIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Submits to TPR</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <EngineeringIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Learn by Watching Real CDL Instructors</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <ThumbUpIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Over 1,200 reviews and counting</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <DevicesIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">For Visual Learners</Typography>
                                        </ListItem>
                                    </>
                                ) : (
                                    // Reading course benefits
                                    <>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <DirectionsRunIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Self-Paced</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <AccessTimeIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Available 24/7</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <VerifiedIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Includes certificate of completion</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <AssuredWorkloadIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Submits to TPR</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <SaveIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Save $25 vs Video Course</Typography>
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        </Stack>
                    ) : (
                        // Standard layout for non-video courses
                        <Stack spacing={2}>
                            {/* Price and title at the top */}
                            <div>
                                <Typography variant="h6" textAlign="center">
                                    {(item as Course | TheoryOption).title}
                                </Typography>
                                {'price' in item && (
                                    <Typography variant="h3" textAlign="center">
                                        ${(item as TheoryOption).price}
                                    </Typography>
                                )}
                            </div>

                            {/* Most Popular badge on its own line for all courses */}
                            {('isPopular' in item && item.isPopular) && (
                                <Box
                                    sx={{
                                        bgcolor: 'success.main',
                                        color: 'white',
                                        px: 1,
                                        py: 0.25,
                                        borderRadius: 1,
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px',
                                        mb: 0.5,
                                        display: 'inline-block',
                                    }}
                                >
                                    Most Popular
                                </Box>
                            )}

                            <Typography variant="body2" color="text.secondary">
                                {(item as Course | TheoryOption).description}
                            </Typography>

                            {('id' in item && item.id === 'reading') && (
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block', fontStyle: 'italic' }}>
                                    Save $25 vs Video Course (but miss out on 10% endorsement discount)
                                </Typography>
                            )}

                            {/* Benefits section for theory options */}
                            <List>
                                {('id' in item && item.id === 'video') ? (
                                    // Video course benefits
                                    <>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <DirectionsRunIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Self-Paced</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <AccessTimeIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Available 24/7</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <VerifiedIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Includes certificate of completion</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <AssuredWorkloadIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Submits to TPR</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <EngineeringIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Learn by Watching Real CDL Instructors</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <ThumbUpIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Over 1,200 reviews and counting</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <DevicesIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">For Visual Learners</Typography>
                                        </ListItem>
                                    </>
                                ) : (
                                    // Reading course benefits
                                    <>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <DirectionsRunIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Self-Paced</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <AccessTimeIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Available 24/7</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <VerifiedIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Includes certificate of completion</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <AssuredWorkloadIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Submits to TPR</Typography>
                                        </ListItem>
                                        <Divider />
                                        <ListItem>
                                            <ListItemIcon>
                                                <SaveIcon style={{ maxHeight: "23px", maxWidth: "50px" }} />
                                            </ListItemIcon>
                                            <Typography variant="body1">Save $25 vs Video Course</Typography>
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        </Stack>
                    )}
                </CardContent>
                <Button
                    variant="contained"
                    color={isSelected ? "error" : "secondary"}
                    size="medium"
                    sx={{ fontWeight: "bold" }}
                    startIcon={
                        isSelected ? <RemoveShoppingCartIcon /> : <ShoppingCartIcon />
                    }
                    onClick={(e) => {
                        e.stopPropagation()
                        onSelect()
                    }}
                >
                    {isSelected ? "Remove from Cart" : "Add to Cart"}
                </Button>
            </CardActionArea>
        </Card>
    );
}; 
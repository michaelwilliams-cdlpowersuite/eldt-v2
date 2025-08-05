import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Radio,
  Stack,
} from '@mui/material'
import { PlayCircle, Film } from 'lucide-react'
import { useTheme } from '@mui/material/styles'
import type { Course, TheoryOption } from '../types'

export const SimpleOptionCard = ({
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
      onClick={onSelect}
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
        {('imageUrl' in item && item.imageUrl) && onPreview ? (
          // Layout for video courses - vertical on mobile, horizontal on desktop
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Radio
                checked={isSelected}
                readOnly
                color="success"
                sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
              />
              {('icon' in item && item.icon) && (
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
              )}
              <Box sx={{ flexGrow: 1 }}>
                {'price' in item ? (
                  // Theory options layout (with inline icon)
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5, flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="h6" component="h4" fontWeight="bold" color="text.primary">
                      {(item as Course | TheoryOption).title}
                    </Typography>
                    {('icon' in item && item.icon) && item.icon}
                  </Stack>
                ) : (
                  // Main course layout (block icon already shown above)
                  <Typography variant="h6" component="h4" fontWeight="bold" color="text.primary" sx={{ mb: 0.5 }}>
                    {(item as Course | TheoryOption).title}
                  </Typography>
                )}

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
                {('id' in item && item.id === 'video') && (
                  <Box
                    sx={{
                      bgcolor: '#ff9800',
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
                    Unlock 10% Off Endorsements
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
              </Box>
              {'price' in item && (
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h6" fontWeight="bold" color="primary.main">
                    ${(item as TheoryOption).price}
                  </Typography>
                </Box>
              )}
            </Stack>
            {/* Video preview section - separate row for better spacing */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack spacing={1} alignItems="center">
                <Box
                  sx={{
                    position: 'relative',
                    width: 120,
                    height: 67.5, // 16:9 aspect ratio
                    borderRadius: 1,
                    overflow: 'hidden',
                    cursor: 'pointer',
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
                    <Film size={24} color="#666" />
                    <Typography variant="caption" color="text.secondary" textAlign="center">
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
                      bgcolor: 'rgba(0, 0, 0, 0.4)',
                      opacity: 0,
                      transition: 'opacity 0.2s ease-in-out',
                    }}
                  >
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <PlayCircle size={20} color="#333" />
                    </Box>
                  </Box>
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  color="inherit"
                  onClick={(e) => {
                    e.stopPropagation()
                    onPreview && onPreview()
                  }}
                  startIcon={<PlayCircle size={16} />}
                  sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}
                >
                  Preview
                </Button>
              </Stack>
            </Box>
          </Stack>
        ) : (
          // Standard layout for non-video courses
          <Stack direction="row" spacing={2} alignItems="center">
            <Radio
              checked={isSelected}
              readOnly
              color="success"
              sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
            />
            {('icon' in item && item.icon) && (
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </Box>
            )}
            <Box sx={{ flexGrow: 1 }}>
              {'price' in item ? (
                // Theory options layout (with inline icon)
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5, flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="h6" component="h4" fontWeight="bold" color="text.primary">
                    {(item as Course | TheoryOption).title}
                  </Typography>
                  {('icon' in item && item.icon) && item.icon}
                </Stack>
              ) : (
                // Main course layout (block icon already shown above)
                <Typography variant="h6" component="h4" fontWeight="bold" color="text.primary" sx={{ mb: 0.5 }}>
                  {(item as Course | TheoryOption).title}
                </Typography>
              )}

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
            </Box>
            {'price' in item && (
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h6" fontWeight="bold" color="primary.main">
                  ${(item as TheoryOption).price}
                </Typography>
              </Box>
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

"use client"

import React, { useState } from "react"
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  LinearProgress,
  Container,
  Paper,
  Divider,
  Stack,
  IconButton,
  Dialog,
  DialogContent,
  Radio,
  RadioGroup,
  FormControl,
  Grid,
  Avatar,
  AppBar,
  Toolbar,
} from "@mui/material"
import {
  CheckCircle,
  Star,
  Film,
  BookOpen,
  CreditCard,
  X,
  ChevronLeft,
  UserPlus,
  PlayCircle,
} from "lucide-react"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone'
import { ReactComponent as Logo } from '../../assets/eldt_white.svg'
import { ReactComponent as ClassA } from '../../assets/icons-05.svg'
import { ReactComponent as ClassB } from '../../assets/icons-07.svg'
import { ReactComponent as ClassBA } from '../../assets/icons-06.svg'
import { useTheme } from "@mui/material/styles"
import { useMediaQuery } from "@mui/material"

// --- Data Definitions ---
const mainCourses = [
  {
    id: "class-a",
    title: "Class A CDL Training",
    description: "For tractor-trailers, such as big rigs.",
    icon: <ClassA style={{ width: "60px", height: "60px", objectFit: "contain" }} />,
  },
  {
    id: "class-b",
    title: "Class B CDL Training",
    description: "For straight trucks, buses, and dump trucks.",
    icon: <ClassB style={{ width: "60px", height: "60px", objectFit: "contain" }} />,
  },
  {
    id: "class-b-a",
    title: "Class B to A Upgrade",
    description: "Upgrade your existing Class B license.",
    icon: <ClassBA style={{ width: "60px", height: "60px", objectFit: "contain" }} />,
  },
  {
    id: "endorsement-only",
    title: "Endorsement Only",
    description: "For existing CDL holders.",
    icon: (
      <Avatar
        sx={{
          bgcolor: "grey.200",
          color: "#2C5F7C",
          width: 60,
          height: 60,
        }}
      >
        <Star size={32} />
      </Avatar>
    ),
  },
]

const theoryOptions = [
  {
    id: "theory-video",
    price: 75,
    title: "Theory Video Master Course",
    description: "Our Video Master Course goes above and beyond industry standard.",
    icon: (
      <Box
        component={Film}
        sx={{
          display: 'inline-block',
          width: 20,
          height: 20,
          ml: 0.5,
          color: 'text.secondary',
          verticalAlign: 'middle'
        }}
      />
    ),
    videoId: "l4Qx4Z4JmLM",
    imageUrl: `https://img.youtube.com/vi/l4Qx4Z4JmLM/mqdefault.jpg`,
  },
  {
    id: "theory-reading",
    price: 50,
    title: "Theory Reading Version",
    description: "If you don't mind doing some reading, this is for you.",
    icon: (
      <Box
        component={BookOpen}
        sx={{
          display: 'inline-block',
          width: 20,
          height: 20,
          ml: 0.5,
          color: 'text.secondary',
          verticalAlign: 'middle'
        }}
      />
    ),
  },
]

const endorsements = [
  { id: "hazmat", price: 25, title: "HAZMAT (H) Endorsement", description: "Online Theory Course." },
  {
    id: "permit-prep",
    price: 10,
    title: "CDL PERMIT PREP EXAM",
    description: "Includes: General Knowledge, Combination & Air Brakes.",
  },
  {
    id: "air-supply",
    price: 15,
    title: "Modernized Air Supply Certification",
    description: "Take your final state exam with confidence.",
  },
  {
    id: "skills-test",
    price: 35,
    title: "NEW - Modernized State Skills Test Prep",
    description: "Includes all modernized maneuvers.",
  },
  { id: "tanker", price: 25, title: "(N) Tanker Endorsement Course", description: "Tanker Endorsement." },
]

const STEPS = [
  { number: 1, title: "Program Selection" },
  { number: 2, title: "Theory Course" },
  { number: 3, title: "Endorsements" },
  { number: 4, title: "Upgrade & Save" },
  { number: 5, title: "Account & Payment" },
]

// --- Reusable UI Components ---
const OptionCard = ({
  item,
  isSelected,
  onSelect,
  onPreview,
}: {
  item: any
  isSelected: boolean
  onSelect: () => void
  onPreview?: () => void
}) => {
  const theme = useTheme()

  return (
    <Card
      onClick={onSelect}
      sx={{
        position: 'relative',
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
      {isSelected && (
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: theme.palette.success.main,
            color: 'white',
            borderRadius: '50%',
            p: 0.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckCircle size={20} />
        </Box>
      )}
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        {item.imageUrl && onPreview ? (
          // Layout for video courses - vertical on mobile, horizontal on desktop
          <Stack spacing={2}>
            <Stack direction="row" spacing={2} alignItems="center">
              {item.icon && (
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
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                  <Typography variant="h6" component="h4" fontWeight="bold" color="text.primary">
                    {item.title}
                  </Typography>
                  {item.id === 'theory-video' && (
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
                      }}
                    >
                      10% Off Endorsements
                    </Box>
                  )}
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Box>
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
                    onPreview()
                  }}
                >
                  <Box
                    component="img"
                    src={item.imageUrl}
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
                    onPreview()
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
            {item.icon && (
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
              <Typography variant="h6" component="h4" fontWeight="bold" color="text.primary" sx={{ mb: 0.5 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </Box>
          </Stack>
        )}
      </CardContent>
    </Card>
  )
}

const CheckboxOptionCard = ({
  item,
  isSelected,
  onToggle,
  showDiscount = false,
  discountPercent = 0,
}: {
  item: any
  isSelected: boolean
  onToggle: () => void
  showDiscount?: boolean
  discountPercent?: number
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
            <Typography variant="h6" component="h4" fontWeight="bold" color="text.primary" sx={{ mb: 0.5 }}>
              {item.title}
            </Typography>
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

const SummaryLine = ({
  label,
  value,
  isDiscount,
  isTotal,
}: {
  label: string
  value: string
  isDiscount?: boolean
  isTotal?: boolean
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

const Input = ({
  id,
  label,
  ...props
}: {
  id?: string
  label?: string
  [key: string]: any
}) => (
  <TextField
    id={id}
    label={label}
    fullWidth
    variant="outlined"
    color="success"
    {...props}
  />
)

const ModernProgressBar = ({
  currentStepIndex,
  totalSteps,
  currentStepTitle,
}: {
  currentStepIndex: number
  totalSteps: number
  currentStepTitle: string
}) => {
  const progressPercentage = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="body2" fontWeight="bold" color="text.primary">
          Step {currentStepIndex + 1} of {totalSteps}: {currentStepTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {Math.round(progressPercentage)}% Complete
        </Typography>
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

// --- Step Components ---
const Step1_MainCourse = ({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (id: string) => void
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Reorder courses for mobile - put "Endorsement Only" first
  const orderedCourses = isMobile
    ? [
      ...mainCourses.filter(course => course.id === 'endorsement-only'),
      ...mainCourses.filter(course => course.id !== 'endorsement-only')
    ]
    : mainCourses

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight="bold" color="text.primary">
        What is your starting point?
      </Typography>
      {orderedCourses.map((course) => (
        <OptionCard
          key={course.id}
          item={course}
          isSelected={selected === course.id}
          onSelect={() => onSelect(course.id)}
        />
      ))}
    </Stack>
  )
}

const Step2_Theory = ({
  selected,
  onSelect,
  onPreview,
}: {
  selected: string
  onSelect: (id: string) => void
  onPreview: (videoId: string) => void
}) => (
  <Stack spacing={3}>
    <Typography variant="h5" fontWeight="bold" color="text.primary">
      Choose your required theory course format.
    </Typography>
    {theoryOptions.map((course) => (
      <OptionCard
        key={course.id}
        item={course}
        isSelected={selected === course.id}
        onSelect={() => onSelect(course.id)}
        onPreview={course.videoId ? () => onPreview(course.videoId) : undefined}
      />
    ))}
  </Stack>
)

const Step3_Endorsements = ({
  selected,
  onToggle,
  selectedTheoryOption,
}: {
  selected: Set<string>
  onToggle: (id: string) => void
  selectedTheoryOption: string
}) => {
  const hasVideoDiscount = selectedTheoryOption === 'theory-video'
  const discountPercent = 10

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight="bold" color="text.primary">
        Select any additional endorsements.
      </Typography>
      {hasVideoDiscount && (
        <Paper
          sx={{
            p: 2,
            bgcolor: 'success.light',
            borderLeft: 4,
            borderColor: 'success.main',
            borderRadius: '0 8px 8px 0',
          }}
        >
          <Typography variant="body1" fontWeight="bold" color="success.dark">
            🎉 Video Course Bonus: Get 10% off all endorsements!
          </Typography>
          <Typography variant="body2" color="success.dark">
            Save money on endorsements because you chose our Video Master Course.
          </Typography>
        </Paper>
      )}
      {endorsements.map((course) => (
        <CheckboxOptionCard
          key={course.id}
          item={course}
          isSelected={selected.has(course.id)}
          onToggle={() => onToggle(course.id)}
          showDiscount={hasVideoDiscount}
          discountPercent={discountPercent}
        />
      ))}
    </Stack>
  )
}

const Step4_UpgradeSave = ({
  theoryOptionId,
  theoryOption,
  selectedEndorsements,
  discount,
  total,
  onUpgrade,
  onPreview,
}: {
  theoryOptionId: string
  theoryOption: any
  selectedEndorsements: any[]
  discount: number
  total: number
  onUpgrade: () => void
  onPreview: () => void
}) => {
  const videoCourse = theoryOptions.find((t) => t.id === "theory-video")

  return (
    <Stack spacing={3}>
      <Typography variant="h5" fontWeight="bold" color="text.primary">
        Upgrade & Save
      </Typography>

      {theoryOptionId === "theory-reading" && selectedEndorsements.length > 0 && (
        <Paper
          sx={{
            p: 3,
            bgcolor: 'warning.light',
            borderLeft: 4,
            borderColor: 'warning.main',
            borderRadius: '0 8px 8px 0',
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="warning.dark" gutterBottom>
            Upgrade to the Video Master Course!
          </Typography>
          <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mt: 2 }}>
            <Box
              sx={{
                position: 'relative',
                width: 96,
                height: 54, // 16:9 aspect ratio
                borderRadius: 1,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              <Box
                component="img"
                src={videoCourse?.imageUrl}
                alt="Video Course Thumbnail"
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
                  gap: 0.5,
                }}
              >
                <Film size={20} color="#666" />
                <Typography variant="caption" color="text.secondary" fontSize="0.6rem" textAlign="center">
                  Video
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" color="warning.dark" sx={{ mb: 2 }}>
                Save 10% on your endorsements by upgrading to our most popular theory course.
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  onClick={onUpgrade}
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{ fontWeight: 'bold' }}
                >
                  Upgrade to Video & Save
                </Button>
                <Button
                  onClick={onPreview}
                  variant="outlined"
                  color="inherit"
                  size="small"
                  startIcon={<PlayCircle size={16} />}
                  sx={{ fontWeight: 'bold' }}
                >
                  Preview
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      )}

      {theoryOptionId === "theory-video" && (
        <Paper
          sx={{
            p: 3,
            bgcolor: 'success.light',
            borderLeft: 4,
            borderColor: 'success.main',
            borderRadius: '0 8px 8px 0',
          }}
        >
          <Typography variant="h6" fontWeight="bold" color="success.dark" gutterBottom>
            Video Course Discount Unlocked!
          </Typography>
          {discount > 0 ? (
            <Typography variant="body2" color="success.dark">
              Because you bundled the Video Master Course with endorsements, you've saved{' '}
              <Typography component="span" fontWeight="bold">10%</Typography> on all
              your selected endorsements!
            </Typography>
          ) : (
            <Typography variant="body2" color="success.dark">
              You've selected the Video Master Course. Go back and add any endorsement to save{' '}
              <Typography component="span" fontWeight="bold">10%</Typography> on
              your endorsement package.
            </Typography>
          )}
        </Paper>
      )}

      <Paper sx={{ p: 3, bgcolor: 'grey.50', border: 1, borderColor: 'grey.300' }}>
        <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>
          Your Package Summary:
        </Typography>
        <Stack spacing={0.5}>
          {theoryOption && <SummaryLine label={theoryOption.title} value={`$${theoryOption.price.toFixed(2)}`} />}
          {selectedEndorsements.map((e) => (
            <SummaryLine key={e.id} label={e.title} value={`$${e.price.toFixed(2)}`} />
          ))}
          {discount > 0 && (
            <SummaryLine label="Video Course Discount (10%)" value={`-$${discount.toFixed(2)}`} isDiscount />
          )}
        </Stack>
        <Divider sx={{ my: 2 }} />
        <SummaryLine label="Total" value={`$${total.toFixed(2)}`} isTotal />
      </Paper>

      {total > 0 && total < 150 && (
        <Paper
          elevation={2}
          sx={{
            p: 3,
            bgcolor: 'info.light',
            border: 2,
            borderColor: 'info.main',
            borderRadius: 2,
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
          }}
        >
          <Stack spacing={1} alignItems="center" textAlign="center">
            <Typography variant="body1" color="info.dark" fontWeight="medium">
              💳 <Typography component="span" fontWeight="bold">Buy Now, Pay Later</Typography> Available!
            </Typography>
            <Typography variant="body2" color="info.dark">
              Spend{' '}
              <Typography component="span" fontWeight="bold" color="primary.main">
                ${(150 - total).toFixed(2)}
              </Typography>{' '}
              more to qualify for flexible payments.
            </Typography>
            <Typography variant="body2" color="info.dark" sx={{ opacity: 0.9 }}>
              Payments as low as <Typography component="span" fontWeight="bold">$25/month</Typography> for 6 months.
            </Typography>
          </Stack>
        </Paper>
      )}
    </Stack>
  )
}

const Step5_Payment = ({
  total,
  accountDetails,
  setAccountDetails,
  paymentMethod,
  setPaymentMethod,
}: {
  total: number
  accountDetails: any
  setAccountDetails: (details: any) => void
  paymentMethod: string
  setPaymentMethod: (method: string) => void
}) => (
  <Stack spacing={3}>
    <Typography variant="h5" fontWeight="bold" color="text.primary">
      Create Your Account & Pay
    </Typography>
    <Grid container spacing={4}>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <UserPlus size={20} />
            <Typography variant="h6" fontWeight="bold" color="text.secondary">
              Account Details
            </Typography>
          </Box>
          <Input
            id="name"
            label="Full Name"
            value={accountDetails.name}
            onChange={(e: any) => setAccountDetails({ ...accountDetails, name: e.target.value })}
          />
          <Input
            id="email"
            type="email"
            label="Email Address"
            value={accountDetails.email}
            onChange={(e: any) => setAccountDetails({ ...accountDetails, email: e.target.value })}
          />
          <Input
            id="password"
            type="password"
            label="Create Password"
            value={accountDetails.password}
            onChange={(e: any) => setAccountDetails({ ...accountDetails, password: e.target.value })}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CreditCard size={20} />
            <Typography variant="h6" fontWeight="bold" color="text.secondary">
              Payment
            </Typography>
          </Box>
          <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
            <SummaryLine label="Total Amount" value={`$${total.toFixed(2)}`} isTotal />
          </Paper>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <FormControlLabel
                value="card"
                control={<Radio color="success" />}
                label="Card"
                sx={{ flex: 1 }}
              />
              <FormControlLabel
                value="gpay"
                control={<Radio color="success" />}
                label="Google Pay"
                sx={{ flex: 1 }}
              />
            </RadioGroup>
          </FormControl>
          {paymentMethod === "card" && (
            <Stack spacing={2}>
              <Input id="card-number" placeholder="Card Number" />
              <Stack direction="row" spacing={2}>
                <Input id="expiry" placeholder="MM/YY" />
                <Input id="cvc" placeholder="CVC" />
              </Stack>
            </Stack>
          )}
        </Stack>
      </Grid>
    </Grid>
  </Stack>
)

// --- Main App Component ---
export default function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedMainCourse, setSelectedMainCourse] = useState("")
  const [selectedTheoryOption, setSelectedTheoryOption] = useState("")
  const [selectedEndorsements, setSelectedEndorsements] = useState(new Set<string>())
  const [accountDetails, setAccountDetails] = useState({ name: "", email: "", password: "" })
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState("")

  // Calculation Logic
  const theoryPrice = theoryOptions.find((o) => o.id === selectedTheoryOption)?.price || 0
  const endorsementsFullPrice = Array.from(selectedEndorsements).reduce((sum, id) => {
    return sum + (endorsements.find((e) => e.id === id)?.price || 0)
  }, 0)
  const endorsementDiscount = selectedTheoryOption === "theory-video" ? endorsementsFullPrice * 0.1 : 0
  const endorsementsSubtotal = endorsementsFullPrice - endorsementDiscount
  const subtotal = theoryPrice + endorsementsSubtotal
  const processingFee = subtotal > 0 ? subtotal * 0.035 : 0
  const total = subtotal + processingFee

  const handleNext = () => {
    if (currentStep === 1 && selectedMainCourse === "endorsement-only") {
      setCurrentStep(3) // Skip to step 3
    } else if (currentStep < 5) {
      setCurrentStep((s) => s + 1)
    }
  }

  const handleBack = () => {
    if (currentStep === 3 && selectedMainCourse === "endorsement-only") {
      setCurrentStep(1) // Go back to step 1
    } else if (currentStep > 1) {
      setCurrentStep((s) => s - 1)
    }
  }

  const openVideoModal = (videoId: string) => {
    setCurrentVideoId(videoId)
    setShowVideoModal(true)
  }

  const closeVideoModal = () => {
    setShowVideoModal(false)
    setCurrentVideoId("")
  }

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1_MainCourse selected={selectedMainCourse} onSelect={setSelectedMainCourse} />
      case 2:
        return (
          <Step2_Theory selected={selectedTheoryOption} onSelect={setSelectedTheoryOption} onPreview={openVideoModal} />
        )
      case 3:
        return (
          <Step3_Endorsements
            selected={selectedEndorsements}
            selectedTheoryOption={selectedTheoryOption}
            onToggle={(id) => {
              const newSet = new Set(selectedEndorsements)
              if (newSet.has(id)) newSet.delete(id)
              else newSet.add(id)
              setSelectedEndorsements(newSet)
            }}
          />
        )
      case 4:
        return (
          <Step4_UpgradeSave
            theoryOptionId={selectedTheoryOption}
            theoryOption={theoryOptions.find((o) => o.id === selectedTheoryOption)}
            selectedEndorsements={Array.from(selectedEndorsements)
              .map((id) => endorsements.find((e) => e.id === id))
              .filter(Boolean)}
            discount={endorsementDiscount}
            total={total}
            onUpgrade={() => setSelectedTheoryOption("theory-video")}
            onPreview={() => openVideoModal(theoryOptions.find((t) => t.id === "theory-video")?.videoId || "")}
          />
        )
      case 5:
        return (
          <Step5_Payment
            total={total}
            accountDetails={accountDetails}
            setAccountDetails={setAccountDetails}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
        )
      default:
        return null
    }
  }

  const isNextDisabled = () => {
    if (currentStep === 1 && !selectedMainCourse) return true
    if (currentStep === 2 && !selectedTheoryOption) return true
    if (currentStep === 5) {
      const { name, email, password } = accountDetails
      return !name || !email || !password
    }
    return false
  }

  const stepsToRender = STEPS.filter((step) => !(selectedMainCourse === "endorsement-only" && step.number === 2))
  const currentStepInfo =
    stepsToRender.find((s) => s.number === currentStep) ||
    stepsToRender.find((s) => s.number > currentStep) ||
    stepsToRender[stepsToRender.length - 1]
  const currentStepIndex = stepsToRender.findIndex((s) => s.number === currentStepInfo.number)

  const theme = useTheme()

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Blue Header */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: "#0E537B" }}>
        <Toolbar>
          <Container
            maxWidth="lg"
            disableGutters
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box display="flex" alignItems="center">
              <Logo style={{ height: "40px" }} />
            </Box>
            <Box display="flex" alignItems="center">
              <LocalPhoneIcon sx={{ color: 'white' }} />
              <a
                href="tel:+15092413987"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Typography variant="overline" sx={{ pl: 1, whiteSpace: "nowrap" }}>
                  (509) 241-3987
                </Typography>
              </a>
            </Box>
          </Container>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ pt: 9, pb: 10 }}>
        <Container maxWidth="md">
          {/* Progress Bar */}
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 2,
              bgcolor: 'white',
              borderRadius: 2,
            }}
          >
            <ModernProgressBar
              currentStepIndex={currentStepIndex}
              totalSteps={stepsToRender.length}
              currentStepTitle={currentStepInfo.title}
            />
          </Paper>

          {/* Step Content */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              bgcolor: 'white',
              borderRadius: 2,
              minHeight: '50vh',
            }}
          >
            {getStepContent()}
          </Paper>
        </Container>
      </Box>

      {/* Fixed Bottom Navigation */}
      <Paper
        elevation={8}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          borderRadius: 0,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}>
            {/* Back Button */}
            {currentStep > 1 ? (
              <Button
                onClick={handleBack}
                startIcon={<ChevronLeft size={18} />}
                variant="outlined"
                color="inherit"
                sx={{
                  fontWeight: 'bold',
                  minWidth: { xs: 'auto', sm: 120 },
                  px: { xs: 2, sm: 3 },
                }}
              >
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Back
                </Box>
              </Button>
            ) : (
              <Box />
            )}

            {/* Step Counter & Progress (Mobile) */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flex: 1,
              justifyContent: 'center',
            }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: { xs: 'block', sm: 'none' } }}
              >
                {currentStepIndex + 1} of {stepsToRender.length}
              </Typography>

              {/* Desktop step dots */}
              <Box sx={{
                display: { xs: 'none', sm: 'flex' },
                gap: 1,
                alignItems: 'center'
              }}>
                {stepsToRender.map((step, index) => (
                  <Box
                    key={step.number}
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: index <= currentStepIndex ? '#00C058' : 'grey.300',
                      transition: 'all 0.2s ease-in-out',
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Next Button */}
            <Button
              onClick={handleNext}
              disabled={isNextDisabled()}
              variant="contained"
              sx={{
                fontWeight: 'bold',
                minWidth: { xs: 'auto', sm: 120 },
                px: { xs: 3, sm: 4 },
                py: 1.5,
                borderRadius: 2,
                backgroundColor: '#00C058',
                '&:hover': {
                  backgroundColor: '#00a048',
                },
                '&:disabled': {
                  backgroundColor: 'grey.300',
                }
              }}
            >
              {currentStep === 5 ? (
                <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                  Complete Enrollment
                </Box>
              ) : (
                <>
                  <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                    Next
                  </Box>
                  <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                    →
                  </Box>
                </>
              )}
            </Button>
          </Box>
        </Container>
      </Paper>

      <Dialog
        open={showVideoModal}
        onClose={closeVideoModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'black',
            borderRadius: 2,
          }
        }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <IconButton
            onClick={closeVideoModal}
            sx={{
              position: 'absolute',
              top: -12,
              right: -12,
              bgcolor: 'black',
              color: 'white',
              zIndex: 10,
              '&:hover': {
                bgcolor: 'grey.800',
              }
            }}
          >
            <X size={20} />
          </IconButton>
          <Box sx={{ aspectRatio: '16/9' }}>
            <Box
              component="iframe"
              src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&rel=0`}
              sx={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: 1,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

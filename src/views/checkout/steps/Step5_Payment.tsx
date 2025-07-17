import React from 'react'
import {
    Stack,
    Typography,
    TextField,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Box,
} from '@mui/material'
import { UserPlus, CreditCard } from 'lucide-react'
import { SummaryLine } from '../components/SummaryLine'
import type { Step5Props } from '../types'

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

export const Step5_Payment: React.FC<Step5Props> = ({
    total,
    accountDetails,
    setAccountDetails,
    paymentMethod,
    setPaymentMethod,
}) => {
    return (
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
} 
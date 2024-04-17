import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';

const PaymentForm = () => {
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: '',
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        let tempErrors = {};
        tempErrors.cardNumber = cardDetails.cardNumber ? "" : "Card number is required";
        tempErrors.expiryDate = cardDetails.expiryDate ? "" : "Expiry date is required";
        tempErrors.cvv = cardDetails.cvv ? "" : "CVV is required";
        tempErrors.cardHolderName = cardDetails.cardHolderName ? "" : "Card holder name is required";

        // Additional validations can be added here (e.g., format of card number, CVV length)
        if (cardDetails.cardNumber && !/^\d{16}$/.test(cardDetails.cardNumber)) {
            tempErrors.cardNumber = "Card number must be 16 digits";
        }
        if (cardDetails.expiryDate && !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(cardDetails.expiryDate)) {
            tempErrors.expiryDate = "Expiry date must be in MM/YY format";
        }
        if (cardDetails.cvv && !/^\d{3}$/.test(cardDetails.cvv)) {
            tempErrors.cvv = "CVV must be 3 digits";
        }

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleChange = (e) => {
        setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("Submitting card details:", cardDetails);  // Log the card details for demo purposes
            alert("Payment submitted successfully!");  // Simulate a successful payment
        }
    };

    return (
        <Box sx={{ maxWidth: 400, m: 'auto', p: 4, textAlign: 'center', pt: 6 }}>
            <Typography variant="h5" gutterBottom>
                Payment Gateway
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Card Number"
                    variant="outlined"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleChange}
                    error={!!errors.cardNumber}
                    helperText={errors.cardNumber}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Expiry Date"
                    variant="outlined"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={handleChange}
                    error={!!errors.expiryDate}
                    helperText={errors.expiryDate}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="CVV"
                    variant="outlined"
                    name="cvv"
                    type="password"
                    value={cardDetails.cvv}
                    onChange={handleChange}
                    error={!!errors.cvv}
                    helperText={errors.cvv}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Card Holder Name"
                    variant="outlined"
                    name="cardHolderName"
                    value={cardDetails.cardHolderName}
                    onChange={handleChange}
                    error={!!errors.cardHolderName}
                    helperText={errors.cardHolderName}
                />
                <Button type="submit" variant="contained" sx={{ mt: 2, width: '100%' }}>
                    Pay Now
                </Button>
            </form>
        </Box>
    );
};

export default PaymentForm;


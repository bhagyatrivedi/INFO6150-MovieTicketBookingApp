import React, { useState } from 'react';
import { Box, Typography, Button, Card } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import TicketPDFGenerator from './TicketPDFGenerator'; // Adjust the import path as necessary

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const mockPaymentProcess = async (paymentMethodId) => {
    console.log('Processing payment with payment method:', paymentMethodId);
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 2000));
};

const PaymentForm = () => {
    const location = useLocation();
    const { theater, movieTitle, selectedSeats, totalPrice, showtime } = location.state || {};
    const stripe = useStripe();
    const elements = useElements();
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#aab7c4"
                }
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handlePayment = async () => {
        if (!stripe || !elements) {
            console.log('Stripe.js has not loaded yet.');
            return;
        }

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            const paymentResult = await mockPaymentProcess(paymentMethod.id);
            if (paymentResult.success) {
                setPaymentSuccess(true);
            } else {
                alert('Payment failed. Please try again.');
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 600, m: 'auto', p: 4, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h5" gutterBottom>Payment Gateway</Typography>
            {!paymentSuccess ? (
                <>
                    <Card sx={{ mb: 2, width: '100%', maxWidth: 450, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Enter Card Details</Typography>
                        <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
                            <CardElement options={cardStyle} />
                            <Button variant="contained" onClick={handlePayment} disabled={!stripe} sx={{ mt: 2, width: '100%' }}>
                                Confirm Payment
                            </Button>
                        </form>
                    </Card>
                </>
            ) : (
                <TicketPDFGenerator ticketDetails={{ theater, movieTitle, selectedSeats, totalPrice, showtime }} />
            )}
        </Box>
    );
};

const StripePaymentForm = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    );
};

export default StripePaymentForm;

import React from 'react';
import {
    Container,
    Card,
    Typography,
    Grid,
    Box,
    Button,
    Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Reservation } from '../../models/reservation';

export default function ReservationManagement  ({reservation} : {reservation: Reservation | null}) {
    const navigate = useNavigate();

    const handleViewReservations = () => {
        navigate('/reservations'); // Ensure this route matches your routing setup
    };

    const handleContinueShopping = () => {
        navigate('/rentals');
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" sx={{ mb: 4 }}>
                Thank you for your reservation!
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 2 }}>
                A confirmation email will be sent out shortly to [your email address]
            </Typography>
            <Card variant="outlined" sx={{ p: 3, mb: 4, textAlign: 'center' }}>
                <Typography variant="h6">
                    Order #: <span style={{ color: 'black' }}>{reservation?.reservationId}</span>
                </Typography>
                <Button variant="outlined" sx={{ mt: 2 }} onClick={handleViewReservations}>
                    View My Reservations
                </Button>
                <Button variant="contained" color="primary" sx={{ mt: 2, ml: 5 }} onClick={handleContinueShopping}>
                    Continue Booking
                </Button>
            </Card>
        </Container>
    );
};

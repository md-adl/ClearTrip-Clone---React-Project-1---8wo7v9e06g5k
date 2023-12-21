import React, { useState } from 'react';
import { Button, CircularProgress, Stack, Box, Divider, Modal, Tab, Tabs, TextField, Typography, FormControlLabel, Checkbox } from '@mui/material';
import QRCode from 'qrcode.react';
import { useNavigate,useLocation } from 'react-router-dom';
import { postUserBooking } from '../../utils/fetchFromApi';
import { useAuth } from "../../utils/auth";
import { useBookingContext } from '../../utils/bookingContext';
import Navbar from '../Home/Navbar'

const PaymentForm = () => {
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [loading, setLoading] = useState(false);
    const [upiId, setUpiId] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [paypalEmail, setPaypalEmail] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const { authState, logout } = useAuth();
    const { bookingValues, setType, setId, setStartDate, setEndDate, setPrice } = useBookingContext();
    const location = useLocation();
    const hotelData = location.state;
    console.log(hotelData);

    const navigate = useNavigate();

    const handlePayment = async () => {
        setLoading(true);

        // Simulate processing time
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Simulate a successful payment
        setPaymentSuccess(true);
        await bookHotels()

        setLoading(false);
    };

    const bookHotels = async () => {
        try {
            setLoading(true);

            console.log("Booking Values:", bookingValues);

            const object = await postUserBooking(
                authState.token,
                'hotel',
                bookingValues.id,
                bookingValues.startDate,
            );

            if (object !== null) {
                // alert("booked successfully")
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAgreeChange = (event) => {
        setAgreed(event.target.checked);
    };


    const handleCloseModal = () => {
        setPaymentSuccess(false);
    };

    const handleViewBookings = () => {
        // Navigate to My Bookings page and replace the current entry in the history stack
        navigate('/account/bookings')
    };

    const renderPaymentInputs = () => {
        if (paymentMethod === 'upi') {
            return (
                <Stack direction="row" justifyContent="space-between" divider={<Divider orientation="vertical" flexItem>OR</Divider>}>
                    <Box flex="1">
                        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                            Enter UPI ID
                        </Typography>
                        <TextField
                            placeholder="UPI ID"
                            fullWidth
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            sx={{ marginTop: 1 }}
                        />
                    </Box>
                    <Box flex="1" justifyContent="center">
                        <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
                            SCAN QR CODE
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Box p={2} sx={{ border: "1px solid #999", marginTop: 1, height: "232px", width: "232px" }}>
                                <QRCode value={`upi://${upiId}`} style={{ width: '200px', height: '200px' }} />
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            );
        } else if (paymentMethod === 'creditCard') {
            return (
                <div>
                    <TextField
                        placeholder="Card Number"
                        fullWidth
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        sx={{ marginTop: 1 }}
                    />
                </div>
            );
        } else if (paymentMethod === 'paypal') {
            return (
                <div>
                    <TextField
                        placeholder="PayPal Email"
                        fullWidth
                        value={paypalEmail}
                        onChange={(e) => setPaypalEmail(e.target.value)}
                        sx={{ marginTop: 1 }}
                    />
                </div>
            );
        }

        return null;
    };

    return (
        <Stack>
            <Navbar/>
             <Stack px={20} py={10}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>
                Pay to complete your booking
            </Typography>
            <Stack direction="row" spacing={2}>
                <Box sx={{ width: "70%", border: "1px solid #e6e6e6", borderRadius: "5px", p: "10px" }}>
                    <Stack direction="row ">
                        <Box style={{ marginRight: '20px' }}>
                            <Tabs
                                orientation="vertical"
                                value={paymentMethod}
                                onChange={(e, newValue) => setPaymentMethod(newValue)}
                                aria-label="Payment Methods"
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                            >
                                <Tab label="UPI" value="upi" />
                                <Tab label="Credit Card" value="creditCard" />
                                <Tab label="PayPal" value="paypal" />
                            </Tabs>
                        </Box>
                        <Box flex={1}>
                            {renderPaymentInputs()}
                        </Box>
                    </Stack>
                </Box>
                <Stack sx={{ width: "30%" }} spacing={2} >
                    <Box sx={{ border: "1px solid #e6e6e6", borderRadius: "5px", p: "5%" }}>
                        <Stack>2 seat left</Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Box>Total price</Box>
                            <Box>{hotelData.hotelData.rooms[0].price}</Box>
                        </Stack>
                        <Divider orientation="horizontal" width="100%" />
                        <Stack direction="row" justifyContent="space-between">
                            <Box>Base fare</Box>
                            <Box>{hotelData.hotelData.rooms[0].costPerNight}</Box>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Box>Taxes and fees</Box>
                            <Box>{hotelData.hotelData.rooms[0].costDetails.baseCost}</Box>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Box>Add ons</Box>
                            <Box>Free</Box>
                        </Stack>
                    </Box>
                    <Box sx={{ borderRadius: "5px", p: "5%", backgroundColor: "#F7F7F7" }} spacing={2}>
                        <Box sx={{ borderRadius: "10px", backgroundColor: "#FF4F17", display: "inline-block", px: "10px", fontSize: "12px" }}>Note</Box>
                        <Typography>Hand Baggage: One personal item like a small laptop bag, ladies' purse, infant bag etc.; Only if it fits under the seat in front of you.</Typography>
                    </Box>
                </Stack>
                <Modal
                    open={paymentSuccess}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                   style={{display:'flex' ,alignItems:'center',justifyContent:'center'}}
                >
                    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', textAlign: 'center', width: '300px', backgroundColor:'white' }}>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>
                            Thank you! Your booking has been completed.
                        </Typography>
                        <Typography sx={{ marginTop: 2 }}>
                            Please go to your bookings for more details.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleViewBookings}
                            sx={{ marginTop: 2 }}
                            
                        >
                            View My Bookings
                        </Button>
                    </div>
                </Modal>
            </Stack>
            <Stack width="70%" direction="row" alignItems="center" justifyContent="space-between" marginTop={2}>
                <Box sx={{ width: "50%" }}>
                    <FormControlLabel fontSize="12px"
                        control={<Checkbox checked={agreed} onChange={handleAgreeChange} />}
                        label={<Typography variant="caption" color="#999">
                            I understand and agree to the rules and restrictions of this fare, the booking policy, the privacy policy and the terms and conditions of Cleartrip and confirm address details entered are correct
                        </Typography>}
                    />
                </Box>
                <Stack direction="row" spacing={2}>
                    <Stack>
                        <Typography align='right'>
                            {hotelData.hotelData.rooms[0].price}
                        </Typography>
                        <Typography variant='caption' color="#999" align='right'>
                            Total, inclusive of all taxes
                        </Typography>
                    </Stack>
                    <Button variant="contained"
                        color="primary"
                        sx={{ height: "40px", width: "120px" }}
                        onClick={handlePayment}
                        disabled={!agreed || !paymentMethod || (paymentMethod === 'creditCard' && !cardNumber) || (paymentMethod === 'paypal' && !paypalEmail) || (paymentMethod === 'upi' && !upiId) || loading}>
                        {loading ? <CircularProgress size={24} /> : 'Pay now'}
                    </Button>
                </Stack>
            </Stack>

        </Stack >
        </Stack>
       
    );
};

export default PaymentForm;

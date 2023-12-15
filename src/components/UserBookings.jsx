import React, { useEffect, useState } from 'react'
import { getUserBooking } from '../utils/fetchFromApi';
import { useAuth } from "../utils/auth";
import {
    Card, Typography, CircularProgress, Box, Button, Stack, Chip, Paper
} from "@mui/material";

import dayjs from 'dayjs';

const UserBookings = () => {
    const [bookingList, setBookingList] = useState([]);

    const { authState, logout } = useAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getBookings = async () => {
            try {
                setLoading(true);
                const object = await getUserBooking(
                    authState.token,
                );
                if (object !== null) {
                    console.log(object.data)
                    setBookingList(object.data);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
            }
        };
        getBookings();
    }, []);

    return (
        <Stack>
            {loading ? <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box> :
                <>
                    {bookingList.map((booking) => (
                        <Card key={booking._id} sx={{ p: 2, mb: 2, display: 'flex', flexDirection: 'row' }}>
                            <Stack flex={1}>
                                <Box>
                                    <Typography variant="subtitle2" fontWeight="bold">Date</Typography>
                                    <Paper elevation={0} sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
                                        {dayjs(booking.created_at).format('ddd, MMM D')}
                                    </Paper>
                                </Box>
                                <Box mt={2}>
                                    <Typography variant="subtitle2" fontWeight="bold">Type</Typography>
                                    <Typography>{booking.booking_type}</Typography>
                                </Box>
                            </Stack>
                            <Stack flex={1} color="#999" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Typography>{booking.created_at}</Typography>
                            </Stack>
                            <Stack flex={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                                <Chip variant='filled' label={booking.status} />

                            </Stack>
                            <Stack flex={1} color="#999" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Stack>
                                    <Typography fontSize="12px">{`Trip ID: ${booking._id}`}</Typography>
                                    <Typography fontSize="10px">{`Booked on: ${booking.created_at}`}</Typography>
                                </Stack>
                            </Stack>
                        </Card>
                    ))}
                </>

                // <Stack>
                //     {bookingList.map((booking) => (
                //         <Stack direction="row" flex={1}>
                //             <Stack width="25%">
                //                 <Box>Date</Box>
                //                 <Box>{booking.created_at}</Box>
                //             </Stack>
                //             <Box width="25%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                //                 {booking.booking_type}
                //             </Box>
                //             <Box width="25%" color="#999" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                //                 {booking.created_at}
                //             </Box>
                //             <Box width="25%" sx={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#FF4F17", borderRadius: "20%" }}>
                //                 {booking.status}
                //             </Box>
                //             <Stack width="25%" color="#999" sx={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                //                 <Box fontSize="12px">
                //                     {`Trip ID:  ${booking._id}`}
                //                 </Box>
                //                 <Box fontSize="10px">
                //                     {`Booked on:  ${booking.created_at}`}
                //                 </Box>
                //             </Stack>
                //         </Stack>))}
                // </Stack>}
            }</Stack>
    )
}

export default UserBookings
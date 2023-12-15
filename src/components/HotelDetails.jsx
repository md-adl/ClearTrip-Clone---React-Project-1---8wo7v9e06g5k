import React, { useEffect, useState } from "react";
import { Box, Button, Stack, Typography, CircularProgress } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { searchHotel } from "../utils/fetchFromApi";
import Navbar from "./Navbar";

const HotelDetails = () => {
    const [hotelList, setHotelList] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const hotelData = location.state;

    console.log(hotelData.item.name);

    // useEffect(() => {
    //     const searchAndSetHotelList = async () => {
    //         try {
    //             setLoading(true);

    //             const object = await searchHotel(searchParam.location, searchParam.hotelData.id);
    //             if (object !== null) {
    //                 setHotelList(object.data.hotels);
    //                 console.log(object.data.hotels);
    //             }
    //         } catch (error) {
    //             console.error("An error occurred:", error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     searchAndSetHotelList();
    // }, []);

    return (
        <Stack>
            <Navbar />
            {loading ? (
                // Show loading spinner while data is being fetched
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                // Render hotel details once data is loaded
                <Stack direction="row">
                    <Stack direction="column">
                        {hotelData.map((hotel) => (
                            <div key={hotel.id}>
                                <Typography variant="h6">{hotel.item.name}</Typography>
                                {/* Add other hotel details here */}
                            </div>
                        ))}
                    </Stack>
                    <Stack direction="column">
                        {/* Add additional content here if needed */}
                    </Stack>
                </Stack>
            )}
        </Stack>
    );
};

export default HotelDetails;

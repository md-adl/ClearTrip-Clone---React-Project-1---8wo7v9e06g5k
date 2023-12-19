import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Divider,
  CardMedia,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { searchHotel } from "../../utils/fetchFromApi";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import Navbar from "../Home/Navbar";

const HotelDetails = () => {
  const [hotelList, setHotelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const hotelData = location.state;

  console.log(hotelData);

  // useEffect(() => {
  //     const searchAndSetHotelList = async () => {
  //         try {
  //             setLoading(true);

  //             const object = await searchHotel(searchParam.location);
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
      <Stack direction="row" style={{ justifyContent: "space-between" }}>
        <Stack
          direction="column"
          style={{
            marginLeft: "30px",
            paddingT: "20px",
            paddingTop: "40px",
            paddingLeft: "50px",
          }}
        >
          {/* Assuming hotelData is an object with a property 'rooms' */}
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            {hotelData.item.name}
          </Typography>
          <Typography>
            <Rating
              name="custom-icon"
              defaultValue={3}
              precision={0.5}
              style={{ paddingTop: "25px" }}
              icon={<StarIcon fontSize="inherit" />}
            />
            <span>{hotelData.item.rating}</span>
          </Typography>
          <Typography variant="h5" style={{ paddingTop: "25px" }}>
            Free breakfast on select plans
          </Typography>
          <span variant="h3">
            <FastfoodIcon />
            {hotelData.item.amenities}
          </span>
          <Divider style={{ paddingTop: "25px" }} />

          <Typography variant="h4" style={{ paddingTop: "25px" }}>
            Amenities
          </Typography>
          <Box style={{ justifyContent: "space-between" }}>
            <span style={{ paddingTop: "25px" }}>
              {hotelData.item.amenities[0]}
            </span>
            <span style={{ paddingTop: "25px" }}>
              {hotelData.item.amenities[1]}
            </span>
          </Box>
        </Stack>
        <Stack direction="column">
          <CardMedia
            component="img"
            alt={hotelData.item.name}
            height="500"
            image={hotelData.item.images[0]}
            style={{ width: "700px", padding: "50px", borderRadius: "25px" }}
          />
          <Button
            variant="contained"
            component={Link}
            to={"/hotel/checkout"}
            state={{ item : hotelData.item}}
            style={{ backgroundColor: "#FF4F17", minWidth: "80px", maxWidth:'250px', marginLeft:'200px' }}
          >
            Book Room
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HotelDetails;

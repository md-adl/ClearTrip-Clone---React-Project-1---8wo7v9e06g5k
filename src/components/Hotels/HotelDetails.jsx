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
import FastfoodIcon from "@mui/icons-material/Fastfood";
import Navbar from "../Home/Navbar";

const HotelDetails = () => {
  const location = useLocation();
  const hotelData = location.state;

  return (
    <Stack sx={{width:'100%'}}>
      <Navbar  />
      <Stack
        direction={{ xs: "column", sm: "column", md: "row" }}
        sx={{ justifyContent: "space-between" }}
      >
        <Stack
          direction="column"
          sx={{
            marginLeft: { xs: 0, sm: 0, md: "30px" },
            padding: { xs: "20px", sm: "20px", md: "50px" },
          }}
        >
          <Typography variant={{ xs: "h4", sm: "h4", md: "h3" }} style={{ fontWeight: "bold" }}>
            {hotelData.item.name}
          </Typography>
          <Typography>
            <Rating
              name="custom-icon"
              defaultValue={3}
              precision={0.5}
              style={{ paddingTop: "15px" }}
              icon={<StarIcon fontSize="inherit" />}
            />
            <span>{hotelData.item.rating}</span>
          </Typography>
          <Typography variant={{ xs: "h6", sm: "h6", md: "h5" }} style={{ paddingTop: "15px" }}>
            Free breakfast on select plans
          </Typography>
          <span variant={{ xs: "h4", sm: "h4", md: "h3" }}>
            <FastfoodIcon />
            {hotelData.item.amenities}
          </span>
          <Divider style={{ paddingTop: "15px" }} />

          <Typography variant={{ xs: "h5", sm: "h5", md: "h4" }} style={{ paddingTop: "15px" }}>
            Amenities
          </Typography>
          <Box sx={{ justifyContent: "space-between" }}>
            <span style={{ paddingTop: "15px" }}>
              {hotelData.item.amenities[0]}
            </span>
            <span style={{ paddingTop: "15px" }}>
              {hotelData.item.amenities[1]}
            </span>
          </Box>
        </Stack>
        <Stack direction="column" sx={{ maxWidth: { xs: "100%", sm: "100%", md: "50%" } }}>
          <CardMedia
            component="img"
            alt={hotelData.item.name}
            height={{ xs: 200, sm: 300, md: 500 }}
            image={hotelData.item.images[0]}
            sx={{ width: "100%", padding: "20px", borderRadius: "15px" }}
          />
          <Button
            variant="contained"
            component={Link}
            to={"/hotel/checkout"}
            state={{ item: hotelData.item }}
            sx={{ backgroundColor: "#FF4F17", minWidth: "80px", maxWidth: '250px', marginLeft: 'auto', marginRight: 'auto', mt: "20px" }}
          >
            Book Room
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HotelDetails;

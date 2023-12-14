import React from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  Paper,
  CardContent,
  Card,
  Divider,
  Stack,
} from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Navbar from "./Navbar.jsx";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import { useLocation } from "react-router-dom";
import { FlightLand, PanoramaPhotosphereRounded } from "@mui/icons-material";

const FlightCheckOut = () => {
  const location = useLocation();
  const flightData = location.state;

  console.log(flightData.day);
  console.log(flightData);

  const circleStyle = {
    width: 50,
    height: 50,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2196f3",
    margin: "30px",
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Navbar />
      </Grid>

      {/* Left Column - Review Itinerary Details */}

      {/* Left Column - Review Itinerary Details */}
      <Grid item xs={12} sm={6}>
        {/* Row 1: Circle Icon and Review Itinerary Text */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          marginLeft="30px"
        >
          <Paper elevation={3} style={circleStyle}>
            <Typography variant="h6">1</Typography>
          </Paper>

          <Typography
            variant="h5"
            style={{
              fontWeight: "bold",
              marginLeft: "20px", // Adjust spacing as needed
            }}
          >
            Review Your Itinerary
          </Typography>
        </Box>

        {/* Row 2: Flight Details */}
        <Box style={{ paddingLeft: "60px", marginTop: "20px" }}>
          <span>
            {flightData.item.source}
            <TrendingFlatIcon />
            {flightData.item.destination}
          </span>

          <span style={{ marginLeft: "10px" }}>{flightData.day}</span>
        </Box>
        <Stack direction="row" width="500px" marginLeft='60px' marginTop="10px" >
          <Box>
            <paper>
              <Typography style={{ fontWeight: "bold" }}>
                FlightId
              </Typography>
              <span style={{ marginTop: "70px" }}>
                {flightData.item.flightID}
              </span>
            </paper>
          </Box>
          <Box marginLeft='15px'>
            <svg width="9" height="97" viewBox="0 0 9 97">
              <g fill="none" fill-rule="evenodd">
                <circle fill="#999" cx="4.5" cy="4.5" r="4.5"></circle>
                <circle fill="#999" cx="4.5" cy="92.5" r="4.5"></circle>
                <path
                  stroke="#999"
                  stroke-linecap="square"
                  stroke-dasharray="7"
                  d="M4.5 7v84"
                ></path>
              </g>
            </svg>
          </Box>
          <Box>
            <paper style={{ marginLeft: "30px", fontSize: "20px" }}>
              <span style={{ fontWeight: "bold" }}>
                {flightData.item.departureTime}
              </span>
              <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
                {flightData.item.source}
              </span>
            </paper>
            <Box style={{ marginLeft: "40px" }}>
              <QueryBuilderOutlinedIcon />
              {flightData.item.duration}
            </Box>
            <Box style={{ marginLeft: "30px" }}>
              <paper style={{ fontSize: "20px" }}>
                <span style={{ fontWeight: "bold" }}>
                  {flightData.item.arrivalTime}
                </span>
                <span style={{ fontWeight: "bold", marginLeft: "20px" }}>
                  {flightData.item.destination}
                </span>
              </paper>
            </Box>
          </Box>
        </Stack>
      </Grid>

      {/* Right Column - Card */}
      <Grid item xs={12} sm={6}>
        <Card style={{ margin: "50px", height: "300px" }}>
          <CardContent>
            <Typography
              variant="body2"
              display="flex"
              justifyContent="space-between"
            >
              <span style={{ fontSize: "24px" }}>Total Price</span>
              <span style={{ fontWeight: "bold", fontSize: "24px" }}>
                &#8377;{flightData.item.ticketPrice}
              </span>
            </Typography>
            <Typography disabled style={{ marginBottom: "30px" }}>
              1 Adult
            </Typography>
            <span>
              <Divider />
            </span>
            <Typography
              disabled
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Base Fare (1 Traveller)</span>
              <span>&#8377;{flightData.item.ticketPrice - 900}</span>
            </Typography>
            <Typography
              disabled
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Taxes and Fee</span>
              <span>&#8377;900</span>
            </Typography>
            <Typography
              disabled
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <span>Add on</span>
              <span>Free</span>
            </Typography>
          </CardContent>
          <Box>
            <Button
              variant="contained"
              style={{ backgroundColor: "#D4581D", marginLeft: "250px" }}
            >
              Continue
            </Button>
          </Box>
        </Card>
      </Grid>
      <div style={{width:'70%' , marginLeft:'100px'}}>
      {/* Static Accordion Panel */}
      <Accordion expanded>
        <AccordionSummary style={{backgroundColor:'#D6E8FC', fontWeight:'bold'}}>
          <Typography ><span>
            {flightData.item.source}
            <TrendingFlatIcon />
            {flightData.item.destination}
            : Standard Fare
          </span></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This is a static panel that is always expanded and cannot be collapsed.
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Dynamic Accordions */}
      <Accordion>
        <AccordionSummary>
          <Typography>Panel 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Content for Panel 1.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary>
          <Typography>Panel 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Content for Panel 2.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    </Grid>
  );
};

export default FlightCheckOut;

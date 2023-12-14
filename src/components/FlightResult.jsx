import {
  Box,
  Button,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import { searchFlight } from "../utils/fetchFromApi";
import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import { cities } from "../utils/constant";
import dayjs from 'dayjs';

const FlightResult = () => {
  const [destination, setDestination] = useState(cities[1]);
  const [departureDate, setDepartureDate] = useState(dayjs());
  const location = useLocation();
  const searchParams = location.state;
  const [loading, setLoading] = useState(true);
  const [flightList, setFlightList] = useState([]);

  useEffect(() => {
    const searchAndSetFlightList = async () => {
      try {
        setLoading(true);

        const object = await searchFlight(
          searchParams.source,
          searchParams.destination,
          searchParams.day
        );

        if (object !== null) {
          setFlightList(object.data.flights);
          console.log(object.data.flights);
          console.log(searchParams.day)
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };
    searchAndSetFlightList();
  }, [searchParams.source, searchParams.destination, searchParams.day]);

  return (
    <Stack>
      <Navbar />

      {loading ? (
        <Stack
          height="100vh"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ padding: "20px 0" }}
        >
          <CircularProgress />
          <Typography variant="body2" color="textSecondary" component="p">
            Loading...
          </Typography>
        </Stack>
      ) : (
        <Stack spacing={5} padding={10}>
          <Stack
            direction="row"
            sx={{
              backgroundColor: "#F7F7F7",
              justifyContent: "space-between",
            }}
            p={4}
            m={3}
            boxShadow={1}
          >
            <Box>Airlines</Box>
            <Box>Departure</Box>
            <Box>Duration</Box>
            <Box>Arrival</Box>
            <Box>Price</Box>
            <Box>Book</Box>
          </Stack>
          {flightList.map((item) => (
            <Accordion
              key={item.flightID}
              sx={{ display: "flex", flexDirection: "column" }}
              p={2}
              boxShadow={1}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box width="20%">
                  <Box>Flight Id</Box>
                  <Box>{item.flightID}</Box>
                </Box>
                <Box width="25%">{item.departureTime}</Box>
                <Box width="30%">
                  <Box>{`${item.duration}h 0m`}</Box>
                  <Box>
                    {item.stops === 0
                      ? "non-stop"
                      : item.stops === 1
                      ? `${item.stops} stop`
                      : `${item.stops} stops`}
                  </Box>
                </Box>
                <Box width="15%">{item.arrivalTime}</Box>
                <Box width="15%">&#8377; {item.ticketPrice}</Box>
                
                <Button variant="contained" style={{backgroundColor:'#D4581D' ,width:'100px'}} component={Link} to={"/flights/results/checkout"} state={{item:item , day:searchParams.day}}>Book </Button>
              </AccordionSummary>

              <AccordionDetails
                sx={{ display: "flex", flexDirection: "column" }}
                p={2}
                boxShadow={4}
              >
                <Stack direction="row" sx={{ display: "flex" ,justifyContent:'space-between' }}>
                  <Stack direction="coulumn">
                    {item.source}
                    <TrendingFlatIcon />
                    {item.destination}
                  </Stack>
                  <Stack direction="column">
                    <Box style={{ fontWeight: "bold" }}>
                      {item.source}
                      {item.departureTime}
                    </Box>
                  </Stack>
                  <Stack direction="column" marginRight='20px'>
                    <QueryBuilderOutlinedIcon />
                    {item.duration}
                  </Stack>
                  <Stack direction="column" style={{ fontWeight: "bold" }}>
                    {item.destination}
                    {item.arrivalTime}
                  </Stack>
                  <Stack direction="column">
                    <Typography variant="body1" color="textSecondary" disabled>
                      Check in Baggage
                    </Typography>
                    <Typography variant="body1" color="textSecondary" disabled>
                      Cabin Baggage
                    </Typography>
                  </Stack>
                  <Stack direction="column">
                    <Typography variant="body1" color="textSecondary" disabled>
                      15kg(1 piece)/Adult
                    </Typography>
                    <Typography variant="body1" color="textSecondary" disabled>
                      7Kg
                    </Typography>
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default FlightResult;

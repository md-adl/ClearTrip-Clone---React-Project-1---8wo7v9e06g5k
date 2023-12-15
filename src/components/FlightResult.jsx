import React, { useState, useEffect } from 'react'
import {
    Accordion, AccordionSummary,
    AccordionDetails, Typography, CircularProgress, Box, Button, Stack, Collapse, Divider
} from "@mui/material";
import { useLocation, Link } from 'react-router-dom';
import Navbar from "./Navbar.jsx";
import { searchFlight } from "../utils/fetchFromApi";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import FlightFilterItem from './FlightFilterItem.jsx';
import AirlinesIcon from '@mui/icons-material/Airlines';
import { cities } from '../utils/constant.js';

const FlightResult = () => {
    const [loading, setLoading] = useState(false);
    const [flightList, setFlightList] = useState([]);
    const [flightFilteredList, setflightFilteredList] = useState([]);

    const [selectedFilters, setSelectedFilters] = useState({
        stops: [],
        departureTime: [],
        priceRange: [],
    });
    const location = useLocation();
    const searchParams = location.state;

    const stopOptions = [
        { label: 'Non - stop', value: 0 },
        { label: '1 stop', value: 1 },
        { label: '2 stops', value: 2 },
    ];

    const departureTimeOptions = [
        { label: 'Early Morning', value: 0 },
        { label: 'Morning', value: 1 },
        { label: 'Afternoon', value: 2 },
        { label: 'Evening', value: 3 },
        { label: 'Night', value: 4 },
    ];

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
                    setflightFilteredList(object.data.flights);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
            }
        };
        searchAndSetFlightList();
    }, []);

    const handleFilterChange = (filterType, value) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    useEffect(() => {

        const mapDepartureTimeRanges = (value) => {
            switch (value) {
                case 0:
                    return [0, 8];
                case 1:
                    return [8, 12];
                case 2:
                    return [12, 16];
                case 3:
                    return [16, 20];
                case 4:
                    return [20, 24];
                default:
                    return [0, 24];
            }
        };
        const filteredList = flightList
            .filter((flight) => (
                selectedFilters.stops.length === 0 || selectedFilters.stops.includes(flight.stops)
            ))
            .filter((flight) => (
                selectedFilters.departureTime.length === 0 ||
                selectedFilters.departureTime.some((value) => {
                    const [start, end] = mapDepartureTimeRanges(value);
                    return flight.departureTime.split(':')[0] >= start && flight.departureTime.split(':')[0] < end;
                })))
            .filter((flight) => (
                flight.ticketPrice >= selectedFilters.priceRange[0] && flight.ticketPrice <= selectedFilters.priceRange[1]
            ))

        setflightFilteredList(filteredList);
    }, [selectedFilters, flightList]);

    const ticketPrices = flightList.map(flight => flight.ticketPrice);

    const minTicketPrice = Math.min(...ticketPrices);
    const maxTicketPrice = Math.max(...ticketPrices);

    return (
        <Stack >
            <Navbar />
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
                <Stack direction="row" spacing={2} px={20} py={5}>
                    <Stack spacing={5} sx={{ width: "30%" }}>
                        <Box direction="row" style={{ fontWeight: "bold" }}>{flightFilteredList.length + " of " + flightList.length + " flights "}</Box>
                        <FlightFilterItem label="Stops" options={stopOptions} onFilterChange={(value) => handleFilterChange('stops', value.checkedItems)}></FlightFilterItem>
                        <FlightFilterItem label="Departure time" options={departureTimeOptions} onFilterChange={(value) => handleFilterChange('departureTime', value.checkedItems)}></FlightFilterItem>
                        <FlightFilterItem label="One-way price" isSlider={true} range={[minTicketPrice, maxTicketPrice]} onFilterChange={(value) => handleFilterChange('priceRange', value.priceRange)}></FlightFilterItem>
                    </Stack>
                    <Stack spacing={3} sx={{ width: "70%" }}>
                        <Stack direction="row" sx={{ backgroundColor: "#F7F7F7" }} p={2} boxShadow={1}>
                            <Box width="25%" >Airlines</Box>
                            <Box width="15%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Departure</Box>
                            <Box width="15%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Duration</Box>
                            <Box width="15%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Arrival</Box>
                            <Box width="15%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Price</Box>
                            <Box width="15%"></Box>
                        </Stack>
                        {
                            flightFilteredList.map((item) => (
                                <Collapse in={true} key={item.flightID}>
                                    <Accordion >
                                        <AccordionSummary
                                            aria-controls={`panel${item._id}`}
                                            id={`panel${item._id}`}
                                            key={item.flightID}
                                            sx={{ py: "2%" }}
                                        >
                                            <Stack width="25%" a >
                                                <Box>Flight Id</Box>
                                                <Box>{item.flightID}</Box>
                                            </Stack>
                                            <Box width="15%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{item.departureTime}</Box>
                                            <Stack width="15%" color="#999" divider={<Divider orientation="horizontal" width="50%" />} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                <Box>{`${item.duration}h 0m`}</Box>
                                                <Box>{item.stops == 0 ? "non stop" : item.stops < 2 ? `${item.stops} stop` : `${item.stops} stops`}</Box>
                                            </Stack>
                                            <Box width="15%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>{item.arrivalTime}</Box>
                                            <Box width="15%" sx={{ display: "flex", justifyContent: "center", alignItems: "center", fontWeight: "bold" }}>₹{item.ticketPrice}</Box>
                                            {/* <Box width="15%" sx={{ display: "flex", justifyContent: "end", alignItems: "center" }}> */}
                                            <Button variant='contained' component={Link} to={"/flight/checkout"} state={{ item: item, day: searchParams.day }} style={{ backgroundColor: '#FF4F17', minWidth: '80px' }}>
                                                Book
                                            </Button>
                                            {/* </Box> */}
                                        </AccordionSummary>

                                        <AccordionDetails>
                                            <Stack divider={<Divider orientation="horizontal" width="100%" />} sx={{ border: "0.5px solid #e6e6e6", borderRadius: "5px", display: "flex", justifyContent: 'space-between' }}>
                                                <Stack direction="row" p={1} spacing={1}>
                                                    <div>{cities.find((city) => city.code === item.source)?.name ?? "name"}</div>
                                                    <ArrowForwardIcon fontSize='small' />
                                                    <div>{cities.find((city) => city.code === item.destination)?.name ?? "name"}</div>
                                                </Stack>
                                                <Stack direction="row" justifyContent="space-between" p={2}>
                                                    <Stack width="15%">
                                                        <Box backgroundColor="#000" color="#fff" p={1} width="40px" height="40px" borderRadius="5px">
                                                            <AirlinesIcon />
                                                        </Box>
                                                        <Box style={{ color: "#999" }}>
                                                            {item.flightID}
                                                        </Box>
                                                    </Stack>
                                                    <Stack direction="row" spacing={1} >
                                                        <Box>{item.source}</Box>
                                                        <Box style={{ fontWeight: "bold" }}>
                                                            {item.departureTime}
                                                        </Box>
                                                    </Stack>
                                                    <Stack direction="column" alignItems="center" >
                                                        <QueryBuilderOutlinedIcon />
                                                        {item.duration}h 0m
                                                    </Stack>
                                                    <Stack direction="row" spacing={1} >
                                                        <Box>{item.destination}</Box>
                                                        <Box style={{ fontWeight: "bold" }}>
                                                            {item.arrivalTime}
                                                        </Box>
                                                    </Stack>
                                                    <Stack direction="column" sx={{ fontSize: "12px" }} width="25%">
                                                        <Stack direction="row" justifyContent="space-between" >
                                                            <Box color="#999">
                                                                Check in Baggage
                                                            </Box>
                                                            <Box >
                                                                15kg/Adult
                                                            </Box>
                                                        </Stack>
                                                        <Stack direction="row" justifyContent="space-between" >
                                                            <Box color="#999" >
                                                                Cabin Baggage
                                                            </Box>
                                                            <Box >
                                                                7Kg
                                                            </Box>
                                                        </Stack>
                                                    </Stack>
                                                </Stack>
                                            </Stack>
                                        </AccordionDetails>
                                    </Accordion>
                                </Collapse>

                            ))
                        }
                    </Stack>
                </Stack>}
        </Stack >
    )
}

export default FlightResult
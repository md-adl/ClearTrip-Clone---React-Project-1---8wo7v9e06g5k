import React, { useState, useEffect } from 'react';

import {
    Box,
    Button,
    Stack,
    Typography,
    Step, Stepper,
    StepLabel,
    StepContent,
    Divider,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    FormControl,
    FormHelperText
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AirlinesIcon from '@mui/icons-material/Airlines';
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import { cities } from '../../utils/constant';
import { useBookingContext } from '../../utils/bookingContext';
import Navbar from '../Home/Navbar'



const FlightCheckOut = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const flightData = location.state;
    const [activeStep, setActiveStep] = React.useState(0);
    const { bookingValues, setType, setId, setStartDate, setEndDate, setPrice } = useBookingContext();


    const [userDetail, setUserDetail] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        gender: ''
    });
    const [validationErrors, setValidationErrors] = useState({
        firstName: '',
        lastName: '',
        mobileNumber: '',
        email: '',
        gender: ''
    });

    const handleSubmit1 = (e) => {
        e.preventDefault();

        const errors = {};

        if (userDetail.mobileNumber.trim() === '') {
            errors.mobileNumber = 'Mobile number is required.';
        }

        if (userDetail.email.trim() === '') {
            errors.email = 'Email is required.';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
        } else {
            setValidationErrors({});
            handleNext();
        }
    };

    const handleSubmit2 = (e) => {
        e.preventDefault();

        const errors = {};

        if (userDetail.firstName.trim() === '') {
            errors.firstName = 'First name is required.';
        }

        if (userDetail.lastName.trim() === '') {
            errors.lastName = 'Last name is required.';
        }

        if (userDetail.gender.trim() === '') {
            errors.gender = 'Gender is required.';
        }

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
        } else {
            setValidationErrors({});
            console.log(flightData.item._id)
            setId(flightData.item._id)
        }
    };

    useEffect(() => {
        if (bookingValues.id && bookingValues.id === flightData.item._id) {
            navigate("payment", {state:{
                flightItem: flightData.item,
            }});
        }
    }, [bookingValues.id, flightData.item._id, navigate]);

    const handleChange = (e) => {
        console.log(e)
        setUserDetail({
            ...userDetail,
            [e.target.name]: e.target.value,
        });
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Stack>
            <Navbar/>
        <Stack direction="row" px={20} py={10}>
            <Box sx={{ width: "70%" }}>
                <Stepper p={0} activeStep={activeStep} orientation="vertical" sx={{
                    '& .MuiStepConnector-line': {
                        display: 'none',
                    },
                    '& .MuiStepContent-root': {
                        border: 'none',
                        paddingLeft: '0px',
                        marginLeft: '0px'
                    },
                    '& .MuiStepIcon-root': {
                        fontSize: "2em",
                    },
                }} >
                    <Step key="1">
                        <StepLabel>
                            <Typography fontSize="25px" marginLeft="10px">
                                Review your itinerary</Typography>
                        </StepLabel>
                        <StepContent>
                            <Stack divider={<Divider co orientation="horizontal" width="100%" />}>
                                <Stack py={2}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Typography sx={{ fontWeight: "bold" }}>{cities.find((city) => city.code === flightData.item.source).name}</Typography>
                                        <ArrowForwardIcon fontSize='small' />
                                        <Typography sx={{ fontWeight: "bold" }}>{cities.find((city) => city.code === flightData.item.destination).name}</Typography>
                                        <Typography style={{ marginLeft: "10px", color: "#999" }}>{flightData.day}</Typography>
                                    </Stack>
                                    <Stack spacing={2} py={2} direction="row" alignItems="center">
                                        <Stack direction="row" spacing={2}>
                                            <Stack fontSize="14px" justifyContent="center">
                                                <Box backgroundColor="#000" color="#fff" p={1} width="35px" height="35px" borderRadius="5px">
                                                    <AirlinesIcon fontSize='small' />
                                                </Box>
                                                <Box style={{ color: "#999" }}>
                                                    {flightData.item.flightID.split("-")[0]}
                                                </Box>
                                                <Box style={{ color: "#999" }}>
                                                    {flightData.item.flightID.split("-")[1]}
                                                </Box>
                                            </Stack>
                                            <svg width="10" viewBox="0 0 9 97">
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
                                        </Stack>
                                        <Stack height="130px" justifyContent="space-between">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Typography fontWeight="bold" fontSize="21px">{flightData.item.departureTime}</Typography>
                                                <Typography>  {flightData.item.source}</Typography>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={1} color="#999">
                                                <QueryBuilderOutlinedIcon />
                                                <Typography> {`${flightData.item.duration}h 0m`}</Typography>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                                <Typography fontWeight="bold" fontSize="21px">{flightData.item.arrivalTime}</Typography>
                                                <Typography>  {flightData.item.destination}</Typography>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Stack>
                                <Stack py={3}>
                                    <Box p={2} style={{ display: "flex", alignItems: "center", backgroundColor: '#D6E8FC', fontWeight: 'bold' }}>
                                        {flightData.item.source}
                                        <ArrowForwardIcon fontSize='small' />
                                        {flightData.item.destination}: Standard Fare
                                    </Box>
                                    <Stack p={2} color="#999" direction="row" justifyContent="space-between" sx={{ border: "0.5px solid #e6e6e6", borderTop: "none" }} >
                                        <Stack >
                                            <Typography>Cancellation fee starts from ₹3,550</Typography>
                                            <Typography> Date change allowed from ₹3,050</Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography>Cabin/person: 7kg</Typography>
                                            <Typography>Free Meal</Typography>
                                        </Stack>
                                        <Stack>
                                            <Typography>Check-in/person: 15kg</Typography>
                                            <Typography>Paid Seat</Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Box sx={{ mb: 2 }}>
                                <div>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Continue
                                    </Button>
                                    <Button
                                        disabled={false}
                                        onClick={handleBack}
                                        sx={{ mt: 1, mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </Box>
                        </StepContent>
                    </Step>
                    <Step key="2">
                        <StepLabel
                            optional={
                                activeStep === 1 ? (
                                    <Typography variant="caption" marginLeft="10px">
                                        E-ticket will be sent to this email address and phone number
                                    </Typography>
                                ) : null
                            }>
                            <Typography fontSize="25px" marginLeft="10px"> Add contact details</Typography>
                        </StepLabel>
                        <StepContent>
                            <Stack spacing={5} py={2}>
                                <form onSubmit={handleSubmit1}>
                                    <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
                                    <TextField
                                        variant="outlined"
                                        name="mobileNumber"
                                        type="tel"
                                        size='small'
                                        value={userDetail.mobileNumber}
                                        error={!!validationErrors.mobileNumber}
                                        helperText={validationErrors.mobileNumber}
                                        onChange={handleChange}
                                        sx={{ minWidth: "50%", marginBottom: "20px" }}
                                        placeholder="Mobile number"
                                        required
                                    />
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <TextField
                                        variant="outlined"
                                        name="email"
                                        type="email"
                                        size='small'
                                        width="50%"
                                        sx={{ minWidth: "50%" }}
                                        error={!!validationErrors.email}
                                        helperText={validationErrors.email}
                                        value={userDetail.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        required
                                    />
                                </form>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit1}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Continue
                                        </Button>
                                        <Button
                                            disabled={false}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </Stack>
                        </StepContent>
                    </Step>
                    <Step key="3">
                        <StepLabel >
                            <Typography fontSize="25px" marginLeft="10px">Add traveller details</Typography>
                        </StepLabel>
                        <StepContent>
                            <Stack spacing={3} py={2} >
                                <Typography fontWeight="bold">Adult 1</Typography>
                                <form onSubmit={handleSubmit2}>
                                    <Typography py={1}>Traveller name and gender</Typography>
                                    <Stack direction="row" spacing={4} sx={{ display: 'flex', justifyContent: 'space-between' }} >
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            name="firstName"
                                            size='small'
                                            value={userDetail.firstName}
                                            error={!!validationErrors.firstName}
                                            helperText={validationErrors.firstName}
                                            onChange={handleChange}
                                            placeholder="First name"
                                            required
                                        />
                                        <TextField
                                            fullWidth
                                            variant="outlined"
                                            name="lastName"
                                            size='small'
                                            error={!!validationErrors.lastName}
                                            helperText={validationErrors.lastName}
                                            value={userDetail.lastName}
                                            onChange={handleChange}
                                            placeholder="Last name"
                                            required
                                        />
                                        <FormControl fullWidth>
                                            <Select
                                                value={userDetail.gender}
                                                name="gender"
                                                onChange={handleChange}
                                                displayEmpty
                                                error={!!validationErrors.gender}
                                                helperText={validationErrors.gender}
                                                size='small'
                                            >
                                                <MenuItem value="" disabled>
                                                    Gender
                                                </MenuItem>
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                            </Select>
                                            <FormHelperText error={!!validationErrors.gender}>
                                                {validationErrors.gender}
                                            </FormHelperText>
                                        </FormControl>
                                    </Stack>
                                </form>
                                <Box sx={{ mb: 2 }}>
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmit2}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Continue to payment
                                        </Button>
                                        <Button
                                            disabled={false}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>
                                </Box>
                            </Stack>
                        </StepContent>
                    </Step>
                </Stepper>
            </Box>
            <Stack sx={{ width: "30%" }} spacing={2} >
                <Box sx={{ border: "1px solid #e6e6e6", borderRadius: "5px", p: "5%" }}>
                    <Stack>2 seat left</Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Box>Total price</Box>
                        <Box> {flightData.item.ticketPrice}</Box>
                    </Stack>
                    <Divider orientation="horizontal" width="100%" />
                    <Stack direction="row" justifyContent="space-between">
                        <Box>Base fare</Box>
                        <Box>{flightData.item.ticketPrice-750}</Box>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Box>Taxes and fees</Box>
                        <Box>750</Box>
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
        </Stack >

        </Stack>
    );
}

export default FlightCheckOut
import React, { useState, useEffect } from "react";

import {
  Box,
  Button,
  Stack,
  Typography,
  Step,
  Stepper,
  StepLabel,
  StepContent,
  Divider,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  CardMedia,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import Navbar from '../Home/Navbar';
import { useBookingContext } from "../../utils/bookingContext";

const HotelCheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hotelData = location.state;
  const [activeStep, setActiveStep] = React.useState(0);
  const { bookingValues, setType, setId, setStartDate, setEndDate, setPrice } =
    useBookingContext();

  console.log(hotelData);

  const [userDetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    gender: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    gender: "",
  });

  const handleSubmit1 = (e) => {
    e.preventDefault();

    const errors = {};

    const mobileNumberRegex = /^\d{10}$/;
    if (!mobileNumberRegex.test(userDetail.mobileNumber.trim())) {
      errors.mobileNumber = "Please enter a valid 10-digit mobile number.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userDetail.email.trim())) {
      errors.email = "Please enter a valid email address.";
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

    if (userDetail.firstName.trim() === "") {
      errors.firstName = "First name is required.";
    }

    if (userDetail.lastName.trim() === "") {
      errors.lastName = "Last name is required.";
    }

    if (userDetail.gender.trim() === "") {
      errors.gender = "Gender is required.";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      setValidationErrors({});
      console.log(hotelData.item._id);
      setId(hotelData.item._id);
    }
  };

    useEffect(() => {
      if (bookingValues.id && bookingValues.id === hotelData.item._id) {
        navigate("payment" ,{state:{
                 hotelData:hotelData.item,
        }});
      }
    }, [bookingValues.id, hotelData.item._id, navigate]);

  const handleChange = (e) => {
    console.log(e);
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
    <Stack
        direction="column"
        spacing={2}
        px={{ xs: 2, md: 20 }}
        py={{ xs: 2, md: 10 }}
        overflow="hidden"
      >
        <Box sx={{ width: '100%' }}>
          <Stepper
            p={0}
            activeStep={activeStep}
            orientation="vertical"
            sx={{
              '& .MuiStepConnector-line': {
                display: 'none',
              },
              '& .MuiStepContent-root': {
                border: 'none',
                paddingLeft: '0px',
                marginLeft: '0px',
              },
              '& .MuiStepIcon-root': {
                fontSize: '2em',
              },
            }}
          >
          <Step key="1">
            <StepLabel>
              <Typography fontSize="25px" marginLeft="10px">
                Review your itinerary
              </Typography>
            </StepLabel>
            <StepContent>
              <Stack
                divider={<Divider co orientation="horizontal" width="100%" />}
              >
                <Stack py={2}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                    border={2}
                    padding={3}
                    style={{ borderColor: "#e6e6e6", width:'500px' }}

                  >
                    <Box>
                      <CardMedia
                        component="img"
                        alt={hotelData.item.name}
                        height="200"
                        image={hotelData.item.images[0]}
                        style={{
                          width: "250px",
                          borderRadius: "25px",
                        }}
                      />
                    </Box>
                    <Box height='100px'>
                      <div>
                        <Rating
                          name="custom-icon"
                          defaultValue={3}
                          precision={0.5}
                          icon={<StarIcon fontSize="inherit" />}
                        />
                        {hotelData.item.rating}
                      </div>
                      <div>{hotelData.item.name}</div>
                      <div>{hotelData.item.location}</div>
                    </Box>
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
              }
            >
              <Typography fontSize="25px" marginLeft="10px">
                {" "}
                Add contact details
              </Typography>
            </StepLabel>
            <StepContent>
              <Stack spacing={5} py={2}>
                <form onSubmit={handleSubmit1}>
                  <InputLabel htmlFor="mobileNumber">Mobile Number</InputLabel>
                  <TextField
                    variant="outlined"
                    name="mobileNumber"
                    type="tel"
                    size="small"
                    value={userDetail.mobileNumber}
                    error={!!validationErrors.mobileNumber}
                    helperText={validationErrors.mobileNumber}
                    onChange={handleChange}
                    sx={{ minWidth: "50%", marginBottom: "20px" }}
                    placeholder="Mobile number"
                    required
                    InputProps={{
                      inputProps: {
                        pattern: "\\d{10}",
                        title: "Please enter a valid 10-digit mobile number.",
                        type: "number"
                      },
                    }}
                  />
                  <InputLabel htmlFor="email">Email</InputLabel>
                  <TextField
                    variant="outlined"
                    name="email"
                    type="email"
                    size="small"
                    width="50%"
                    sx={{ minWidth: "50%" }}
                    error={!!validationErrors.email}
                    helperText={validationErrors.email}
                    value={userDetail.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    InputProps={{
                      inputProps: {
                        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
                        title: "Please enter a valid email address.",
                      },
                    }}
                    
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
            <StepLabel>
              <Typography fontSize="25px" marginLeft="10px">
                Add traveller details
              </Typography>
            </StepLabel>
            <StepContent>
              <Stack spacing={3} py={2}>
                <Typography fontWeight="bold">Adult 1</Typography>
                <form onSubmit={handleSubmit2}>
                  <Typography py={1}>Traveller name and gender</Typography>
                  <Stack
                    direction="row"
                    spacing={4}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      name="firstName"
                      size="small"
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
                      size="small"
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
                        size="small"
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
      <Stack sx={{ width: { xs: '100%', md: '30%' } }} spacing={2}>
        <Box sx={{ border: "1px solid #e6e6e6", borderRadius: "5px", p: "5%" }}>
          <Stack direction="row" justifyContent="space-between">
            <Box>Total price</Box>
            <Box>{hotelData.item.rooms[0].costPerNight}</Box>
          </Stack>
          <Divider orientation="horizontal" width="100%" />
          <Stack direction="row" justifyContent="space-between">
            <Box>Base fare</Box>
            <Box>{hotelData.item.rooms[0].costDetails.baseCost}</Box>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Box>Taxes and fees</Box>
            <Box>{hotelData.item.rooms[0].costDetails.taxesAndFees}</Box>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Box>Add ons</Box>
            <Box>Free</Box>
          </Stack>
        </Box>
        <Box
          sx={{ borderRadius: "5px", p: "5%", backgroundColor: "#F7F7F7" }}
          spacing={2}
        >
          <Box
            sx={{
              borderRadius: "10px",
              backgroundColor: "#FF4F17",
              display: "inline-block",
              px: "10px",
              fontSize: "12px",
            }}
          >
            Note
          </Box>
          <Typography>
            Hand Baggage: One personal item like a small laptop bag, ladies'
            purse, infant bag etc.; Only if it fits under the seat in front of
            you.
          </Typography>
        </Box>
      </Stack>
    </Stack>
    </Stack>
  );
};

export default HotelCheckOut;

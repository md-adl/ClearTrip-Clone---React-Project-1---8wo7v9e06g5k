import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Button, IconButton, Stack, Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { cities } from "../../utils/constant";
import { Link } from "react-router-dom";
import { useBookingContext } from "../../utils/bookingContext";
import '../../index.css'

export const Flight = () => {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [source, setSource] = useState(cities[0]);
  const [destination, setDestination] = useState(cities[1]);
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState("One Way");
  const {
    bookingValues,
    setType,
    setId,
    setStartDate,
    setEndDate,
    setPrice,
  } = useBookingContext();

  const handleRoundTrip = (event) => {
    setIsRoundTrip(event.target.value);
  };

  useEffect(() => {
    setStartDate(departureDate.toISOString());
  }, [departureDate]);

  return (
    <Stack p={5} boxShadow={2} sx={{ overflow: "hidden", width: "100%", maxWidth: "100%" }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              value={isRoundTrip ? 1 : 0}
              onChange={handleRoundTrip}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={0}>One Way</MenuItem>
              <MenuItem value={1}>Round Trip</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="source"
            freeSolo
            value={`${source.code} - ${source.name}`}
            onChange={(event, newSource) => {
              const selectedCity = cities.find((city) => city.name === newSource);
              if (selectedCity) {
                setSource(selectedCity);
              } else {
                setSource("");
              }
            }}
            options={cities.map((option) => option.name)}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Where from?" />}
          />
        </Grid>
        <Grid item xs={12}>
          <IconButton disableRipple aria-label="swap">
            <SwapHorizIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            id="destination"
            freeSolo
            value={`${destination.code} - ${destination.name}`}
            onChange={(event, newDestination) => {
              const selectedCity = cities.find((city) => city.name === newDestination);
              if (selectedCity) {
                setDestination(selectedCity);
              } else {
                setDestination("");
              }
            }}
            options={cities.map((option) => option.name)}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Where to?" />}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="ddd, MMM D"
              defaultValue={departureDate}
              value={departureDate}
              onChange={(newValue) => {
                setDepartureDate(newValue);
              }}
              disablePast
              sx={{ width: "100%" }}
            />
          </LocalizationProvider>
        </Grid>
        
        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            component={Link}
            to="/flight/result"
            state={{
              source: source.code,
              destination: destination.code,
              day: dayjs(departureDate).format("ddd"),
            }}
          >
            Search Flight
          </Button>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Flight;

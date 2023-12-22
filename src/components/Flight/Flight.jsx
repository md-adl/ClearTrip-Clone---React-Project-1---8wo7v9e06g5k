import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Button, IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
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
    <Stack>
      <Stack p={5} spacing={2} boxShadow={2} style={{ overflowX: "hidden" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 0 }}
        >
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }}>
            <Select
              value={0}
              onChange={handleRoundTrip}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>One Way</MenuItem>
              <MenuItem value={1}>Round Trip</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120, width: "100%" }}>
            <Select
              value={0}
              onChange={handleRoundTrip}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>One Way</MenuItem>
              <MenuItem value={1}>Round Trip</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack direction="column" sx={{ flexDirection: { md: "row" } }}>
          <Autocomplete
            id="source"
            freeSolo
            value={`${source.code} - ${source.name}`}
            onChange={(event, newSource) => {
              const selectedCity = cities.find(
                (city) => city.name === newSource
              );
              if (selectedCity) {
                setSource(selectedCity);
              } else {
                setSource("");
              }
            }}
            options={cities.map((option) => option.name)}
            sx={{ minWidth: { md: 300 }, width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Where from?" />
            )}
          />
          <IconButton disableRipple aria-label="swap">
            <SwapHorizIcon />
          </IconButton>
          <Autocomplete
            id="destination"
            freeSolo
            value={`${destination.code} - ${destination.name}`}
            onChange={(event, newDestination) => {
              const selectedCity = cities.find(
                (city) => city.name === newDestination
              );
              if (selectedCity) {
                setDestination(selectedCity);
              } else {
                setDestination("");
              }
            }}
            options={cities.map((option) => option.name)}
            sx={{ minWidth: { md: 300 }, width: "100%" }}
            renderInput={(params) => (
              <TextField {...params} label="Where to?" />
            )}
          />
        </Stack>
        <Stack direction="column" spacing={2}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              format="ddd, MMM D"
              defaultValue={departureDate}
              value={departureDate}
              onChange={(newValue) => {
                setDepartureDate(newValue);
              }}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
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
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Flight;

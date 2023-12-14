import {useState } from "react";
import { searchFlight } from "../utils/fetchFromApi";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Box, Button, IconButton } from "@mui/material";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import dayjs from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { cities } from "../utils/constant";
import {Link} from 'react-router-dom';


export const Flight = () => {
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [source, setSource] = useState(cities[0]);
  const [destination, setDestination] = useState(cities[1]);
  const [departureDate, setDepartureDate] = useState(dayjs());
  const [returnDate, setReturnDate] = useState(dayjs());

  const [flightList, setFlightList] = useState({ data: { flights: [] } });

  const [loading, setLoading] = useState(false);

  const [selectedValue, setSelectedValue] = useState("One Way");

  const handleRoundTrip = (event) => {
    setIsRoundTrip(event.target.value)
  };

  const searchAndSetFlightList = async () => {
    try {
      setLoading(true);

      const object = await searchFlight(
        source.code,
        destination.code,
        dayjs(departureDate).format('ddd')
      );

      if (object !== null) {
        setFlightList(object);
        // navigate("/flights/results", { state: object.data.flights });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };


  // const searchAndSetFlightList = async () => {
  //   try {
  //     setLoading(true);

  //     const object = await searchFlight(
  //       source.code,
  //       destination.code,
  //       dayjs(departureDate).format('ddd')
  //     );

  //     if (object !== null) {
  //       setFlightList(object);
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Stack>
      <Stack p={5} spacing={2} boxShadow={2}>
        <Stack direction="row" spacing={2}>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={0}
              onChange={handleRoundTrip}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>One Way</MenuItem>
              <MenuItem value={1}>Round Trip</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={0}
              onChange={handleRoundTrip}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>One Way</MenuItem>
              <MenuItem value={1}>Round Trip</MenuItem>
            </Select>
          </FormControl>

        </Stack>
        <Stack direction="row"  >
          <Autocomplete
            id="source"
            freeSolo
            value={`${source.code} - ${source.name}`}
            onChange={(event, newSource) => {
              const selectedCity = cities.find((city) => city.name === newSource);
              if (selectedCity) {
                setSource(selectedCity);
              } else {
                setSource('');
              }
              // console.log('Selected Value:', newSource);
            }}
            options={cities.map((option) => option.name)}
            sx={{ minWidth: 300 }}
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
              const selectedCity = cities.find((city) => city.name === newDestination);
              if (selectedCity) {
                setDestination(selectedCity);
              } else {
                setDestination('');
              }
            }}
            options={cities.map((option) => option.name)}
            sx={{ minWidth: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Where to?" />
            )}
          />
        </Stack>
        <Stack direction="row" spacing={2} >

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker format='ddd, MMM D'
              defaultValue={departureDate}
              value={departureDate}
              onChange={(newValue) => {
                setDepartureDate(newValue)
              }}
            />
          </LocalizationProvider>
          <Button variant="contained" component={Link} to={"/flights/results"} state={{source:source.code, destination:destination.code , day:dayjs(departureDate).format('ddd')}}> Search Flight</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Flight;

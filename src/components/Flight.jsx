import { useEffect, useState } from "react";
import { searchFlight } from "../utils/fetchFromApi";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  IconButton,
  Typography,
  Card,
  CardContent,
  Grid,
  makeStyles,
  Container,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import PersonIcon from "@material-ui/icons/Person";

const Flight = () => {
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const [departureDate, setDepartureDate] = useState(dayjs('2023-12-17'));
  const [returnDate, setReturnDate] = useState(dayjs('2023-12-20'));

  const [selectedValue, setSelectedValue] = useState("One Way");

 

  const RoundTripIcon = () => {
    return (
      <div>
        <ArrowForwardIcon />
        <ArrowBackIcon />
      </div>
    );
  };
  const handleDate = (event) => {
    setDepartureDate(event.target.value);
  };
  const handleRoundTrip = (event) => {
    setIsRoundTrip(event.target.value)
  };
  const cities = [
    { name: "New Delhi", code: "DEl" },
    { name: "Bengluru", code: "BLR" },
    { name: "Mumbai", code: "BOM" },
    { name: "Kolkata", code: "CUT" },
    { name: "Chennai", code: "Chennai" },
    { name: "Patna", code: "PAT" },
    { name: "Chandigarh", code: "CGH" },
  ];

  useEffect(() => {
    searchFlight("Del", "Bom", "Mon");
  });
  return (
    
 
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
        <Stack direction="row" spacing={2} >
          <Autocomplete
            id="source"
            freeSolo
            options={cities.map((option) => option.name)}
            sx={{minWidth:300}}
            renderInput={(params) => (
              <TextField {...params} label="Where from?" />
            )}
          />
          <IconButton aria-label="swap">
              <SwapHorizIcon/>
         </IconButton>
          <Autocomplete
            id="destination"
            freeSolo
            options={cities.map((option) => option.name)}
            sx={{minWidth:300}}
            renderInput={(params) => (
              <TextField {...params} label="Where to?" />
            )}
          />
          </Stack>
          <Stack direction="row" spacing={2} >
          <Stack direction="row">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
        <DatePicker
          label="Controlled picker"
          value={departureDate}
          onChange={(newValue) => setDepartureDate(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker label="Uncontrolled picker" defaultValue={dayjs('2022-04-17')} />
        <DatePicker
          label="Controlled picker"
          value={returnDate}
          onChange={(newValue) => setReturnDate(newValue) }
        />
      </DemoContainer>
    </LocalizationProvider>
          </Stack>
          <Button>Search Flight</Button>
          </Stack>
        </Stack>
     
   
  );
};

export default Flight;

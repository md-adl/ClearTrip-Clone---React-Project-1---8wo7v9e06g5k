import { Stack, Button,Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from '../images/Cleartrip-New-Logo.png'
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
const HotelHeader = () => (
  <Stack direction="row" p={2} sx={{ background: '##FFFFFF', justifyContent: "space-between", boxShadow: 3 }} >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={50} />
    </Link>
    <Stack direction="row"  >
        <Box width={200}>
 
        <Autocomplete
          freeSolo
          renderInput={(params) => (
            <TextField {...params} label="Mumbai" />
          )}
        />
        </Box>
        <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker format='ddd, MMM D'
              defaultValue={dayjs()}
            />
          </LocalizationProvider>
        </Box>
        
    </Stack>

    <Button variant="contained">Login/Signup</Button>
  </Stack>
);

export default HotelHeader;
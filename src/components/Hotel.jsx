

import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { cities } from "../utils/constant";
import { searchHotels } from '../utils/fetchFromApi';
import { Link} from 'react-router-dom';

import { useState} from 'react';

const Hotel = () => {
  const [loading, setLoading] = useState(false); 
  const [hotelList,SetHotelList ] =useState({ data: { hotels: [] } });
  const [location , setLocation] = useState([cities[0]])
  // const navigate = useNavigate();
  const searchAndSetHotelList = async () => {
    try {
      setLoading(true);
      const object = await searchHotels(
        location.name
      );

      if (object !== null) {
        // SetHotelList(object);
        console.log(object.data.hotels);
        // console.log(hotelList);
        // navigate("/hotels/results", { state: object.data.hotels});
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack>
      <Stack p={5} spacing={2} boxShadow={2}>

        <Autocomplete
          freeSolo
          onChange={(event, newSource) => {
            const selectedCity = cities.find((city) => city.name === newSource);
            if (selectedCity) {
              setLocation(selectedCity);
            } else {
              setLocation('');
            }
            // console.log('Selected Value:', newSource);
          }}
          options={cities.map((option) => option.name)}
          sx={{ minWidth: 600 }}
          renderInput={(params) => (
            <TextField {...params} label="Enter Locality, landark, city or hotel" />
          )}
        />
        <Stack spacing={2} direction="row">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker format='ddd, MMM D'
              defaultValue={dayjs()}
              value={dayjs()}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker format='ddd, MMM D'
              defaultValue={dayjs().add(1, 'day')}
              value={dayjs().add(1, 'day')}
            />
          </LocalizationProvider>
        </Stack>

        <Button variant="contained"  component={Link} to={"/hotels/results"} state={{location:location.name}}>Search Hotels</Button>
      </Stack>
    </Stack>
  )
}

export default Hotel

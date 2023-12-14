import { Box, Button, Stack, Typography,CircularProgress } from "@mui/material";
import { useLocation ,Link} from "react-router-dom";
import HotelsHeader from "./HotelsHeader";
import { Paper, Grid, Card, CardContent, CardMedia } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useEffect } from "react";
import { searchHotels } from "../utils/fetchFromApi";
import { useState } from "react";
import HotelHeader from "./HotelsHeader";

const HotelResult = () => {
  
  const [hotelList,SetHotelList]=useState([])
  const [loading, setLoading] = useState(true)
  const location = useLocation();
  const searchParam = location.state;
  console.log(searchParam);

  // Check if hotelList is null or undefined
  useEffect(() => {
    const searchAndSetFlightList = async () => {
        try {
            setLoading(true);

            const object = await searchHotels(
                searchParam.location
            );

            if (object !== null) {
              SetHotelList(object.data.hotels);
                console.log(object.data.hotels);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoading(false);
        }
    };
    searchAndSetFlightList();
}, [location.name]);
  return (
   <Stack>
       <HotelHeader/>
       <Stack direction="row">
        <Stack direction="column">
         {hotelList.name}
        </Stack>
        <Stack direction="column">

        </Stack>

       </Stack>
   </Stack>
  )
}

export default HotelResult

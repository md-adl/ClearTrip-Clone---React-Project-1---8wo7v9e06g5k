
import { Box, Button, Stack, Typography,CircularProgress } from "@mui/material";
import { useLocation ,Link} from "react-router-dom";
import HotelsHeader from "./HotelsHeader";
import { Paper, Grid, Card, CardContent, CardMedia } from "@material-ui/core";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useEffect } from "react";
import { searchHotels } from "../utils/fetchFromApi";
import { useState } from "react";

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
      <HotelsHeader />
      {loading ? (
        <Stack
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
      
      <Grid container spacing={2} margin={5}>
        
        {hotelList.map((hotel) => (
          <Grid item xs={3}>
            <Card>
              <Link to={"/hotels/results/detail"} element={<HotelResult/>} state={{location:location.name}}> 
              <CardMedia
                component="img"
                alt={hotel.name}
                height="250"
                image={hotel.images[0]} // Assuming the first image is the card image
              />
              </Link>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                }}
              >
                <Stack direction="column">
                  <Typography>{hotel.name}</Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {hotel.rooms[0].costDetails.baseCost}
                    <span style={{ fontSize: "1rem" }}>
                      &#8377; +{" "}
                      <span>
                        {hotel.rooms[0].costDetails.taxesAndFees}&#8377; /Night
                      </span>
                    </span>
                  </Typography>
                </Stack>
                <Stack direction="column">
                  <Typography>
                    <Rating
                      name="custom-icon"
                      defaultValue={3}
                      precision={0.5}
                      icon={<StarIcon fontSize="inherit" />}
                    />
                    {hotel.rating}
                  </Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      
      </Grid>
      )}
    </Stack>
  );
};

export default HotelResult;

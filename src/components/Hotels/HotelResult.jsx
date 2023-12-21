import {
  Box,
  Button,
  Stack,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import Navbar from "../Home/Navbar";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { useEffect } from "react";
import { searchHotel } from "../../utils/fetchFromApi";
import { useState } from "react";
import HotelDetails from "./HotelDetails";

const HotelResult = () => {
  const [hotelList, setHotelList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const searchParam = location.state;
  console.log(searchParam);
  console.log(hotelList);

  useEffect(() => {
    const searchAndSetFlightList = async () => {
      try {
        setLoading(true);

        const object = await searchHotel(searchParam.location);

        if (object !== null) {
          setHotelList(object.data.hotels);
          console.log(object.data.hotels);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      } finally {
        setLoading(false);
      }
    };
    searchAndSetFlightList();
  }, []);

  return (
    <Stack>
      <Navbar />
      {loading ? (
        <Stack
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255, 255, 255, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress />
        </Stack>
      ) : (
        <Grid container spacing={2} margin={5} sx={{ overflow: "hidden" }}>
          {hotelList.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} sx={{ overflow: "hidden" }}>
              <Card sx={{ maxWidth: 300, margin: "auto" }}>
                <Link
                  to={"/hotel/detail"}
                  state={{ item: item, location: searchParam.location }}
                  component={Link}
                >
                  <CardMedia
                    component="img"
                    alt={item.name}
                    height="200"
                    image={item.images[0]}
                  />
                </Link>
                <Stack
                  direction="row"
                  spacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: { xs: 1, sm: 2, md: 3 },
                  }}
                >
                  <Stack direction="column">
                    <Typography
                      variant={{ xs: "h6", sm: "h5", md: "h4" }}
                      sx={{ overflow: "hidden" }}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      sx={{ overflow: "hidden" }}
                    >
                      {item.rooms[0].costDetails.baseCost}
                      <span style={{ fontSize: "1rem" }}>
                        &#8377; +{" "}
                        <span>
                          {item.rooms[0].costDetails.taxesAndFees}&#8377;/Night
                        </span>
                      </span>
                    </Typography>
                  </Stack>
                  <Stack direction="column">
                    <Typography sx={{ overflow: "hidden" }}>
                      <Rating
                        name="custom-icon"
                        defaultValue={3}
                        precision={0.5}
                        icon={<StarIcon fontSize="inherit" />}
                      />
                      {item.rating}
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

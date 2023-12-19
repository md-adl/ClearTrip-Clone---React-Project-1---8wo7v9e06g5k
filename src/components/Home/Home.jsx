import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from './Sidebar.jsx';
import Navbar from "../Home/Navbar.jsx";
import { categories } from "../../utils/constant.js";



const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("Flights");
  return (

    <Stack >
      <Navbar />
      <Stack direction="column" sx={{ flexDirection: { md: "row" }, paddingX: "5%" }}>
        <Sidebar categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <Stack >
          <Typography p={2} variant="h4" fontWeight="bold" sx={{ color: "black" }}>
            Search <span style={{ color: "black" }}>{selectedCategory} </span>
          </Typography>
          <Box><Outlet /></Box>
        </Stack>
      </Stack>
    </Stack >
  );
}

export default Home

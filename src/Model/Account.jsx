import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from '../components/Home/Sidebar.jsx';
import Navbar from "../components/Home/Navbar.jsx";
import { accountCategories } from "../utils/constant.js";


const Account = () => {
    const [selectedCategory, setSelectedCategory] = useState("Bookings");
    return (
        <Stack >
            <Navbar />
            <Stack direction="column" sx={{ flexDirection: { md: "row" }, paddingX: "5%" }}>
                <Sidebar isAccount={true} categories={accountCategories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Stack >
                    <Typography p={2} variant="h4" fontWeight="bold" sx={{ color: "black" }}>
                        Your <span style={{ color: "black" }}>{selectedCategory} </span>
                    </Typography>
                    <Box><Outlet /></Box>
                </Stack>
            </Stack>
        </Stack >
    );
}

export default Account

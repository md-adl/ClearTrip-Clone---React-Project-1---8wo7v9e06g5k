import React, { useState } from "react";
import { Stack, Button ,Box} from "@mui/material";
import { profile } from "../utils/constant";
import Navbar from './Navbar'
import { Link ,Outlet} from "react-router-dom";

const ViewBooking = ({selectedProfile, setSelectedProfile}) => {
  
  return (
    <Stack >
      <Stack
        direction="row"
        sx={{
          padding: "20px",
          width: { sx: "auto", md: "20vw" },
          height: { sx: "auto", md: "90%" },
          flexDirection: { md: "column" },
        }}
      >
        {profile.map((profile) => (
          <Button
          to={`/account/booking/${profile.name.toLowerCase()}`} 
          component={Link}
            onClick={() => setSelectedProfile(profile.name)}
            key={profile.name}
            size="large"
            startIcon={profile.icon}
            sx={{
              className: "category-btn",
              marginBottom: "10px",
              justifyContent: "flex-start",
              color: profile.name === setSelectedProfile ? "#36c" : "black",
              backgroundColor:
                profile.name === selectedProfile ? "#D5E7FC" : null,
              ":hover": {
                background:
                  profile.name === setSelectedProfile ? "#D5E7FC" : "#EFF5FB",
                color: "#36c",
              },
            }}
          >
            {profile.name}
          </Button>
        ))
        }
   </Stack>
    </Stack>
  );
};

export default ViewBooking;

import React, { useState } from "react";
import { Stack, IconButton, useMediaQuery } from "@mui/material";
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ isAccount, categories, selectedCategory, setSelectedCategory }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:960px)');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {isMobile && (
        <IconButton onClick={toggleSidebar} sx={{ marginBottom: "10px", marginLeft: "auto" }}>
          <MenuIcon />
        </IconButton>
      )}

      {isSidebarOpen || !isMobile ? (
        <Stack
          direction={{ xs: "column", md: "column" }}
          sx={{
            padding: "20px",
            width: isSidebarOpen ? "100%" : { xs: "80vw", md: "20vw" }, // Adjusted width logic
            height: { xs: "auto", md: "90%" },
            flexDirection: { md: "column" },
            transition: "width 0.3s ease",
          }}
        >
          {categories.map((category) => (
            <Button
              to={`/${isAccount ? "account/" : ""}${category.name.toLowerCase()}`}
              component={Link}
              onClick={() => {
                setSelectedCategory(category.name);
                if (isMobile && isSidebarOpen) {
                  toggleSidebar();
                }
              }}
              key={category.name}
              size="large"
              startIcon={category.icon}
              sx={{
                className: "category-btn",
                marginBottom: "10px",
                justifyContent: "flex-start",
                color: category.name === selectedCategory ? "#36c" : "black",
                backgroundColor: category.name === selectedCategory ? "#D5E7FC" : null,
                ":hover": {
                  background: category.name === selectedCategory ? "#D5E7FC" : "#EFF5FB",
                  color: "#36c"
                },
              }}
            >
              {category.name}
            </Button>
          ))}
        </Stack>
      ) : null}
    </>
  );
};

export default Sidebar;

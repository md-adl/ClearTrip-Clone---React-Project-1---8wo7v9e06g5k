import React from "react";
import { Stack, Box } from "@mui/material";
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";

const Sidebar = ({ isAccount, categories, selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      padding: "20px",
      width: { sx: "auto", md: "20vw" },
      height: { sx: "auto", md: "90%" },
      flexDirection: { md: "column" },
    }}
  >
    {categories.map((category) => (
      <Button to={`/${isAccount ? "account/" : ""}${category.name.toLowerCase()}`} component={Link}
        onClick={() => setSelectedCategory(category.name)}
        key={category.name}
        size="large"
        startIcon={category.icon} sx={{
          className: "category-btn", marginBottom: "10px", justifyContent: "flex-start", color: category.name === selectedCategory ? "#36c" : "black", backgroundColor: category.name === selectedCategory ? "#D5E7FC" : null, ":hover": {
            background: category.name === selectedCategory ? "#D5E7FC" : "#EFF5FB",
            color: "#36c"
          },
        }}
      >
        {category.name}
      </Button>
    ))}
  </Stack >
);

export default Sidebar;
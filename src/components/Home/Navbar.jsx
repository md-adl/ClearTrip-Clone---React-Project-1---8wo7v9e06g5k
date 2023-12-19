import React, { useState } from "react";
import { Stack, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../images/Cleartrip-New-Logo.png'
import LoginModal from "../../Model/LoginModal";
import { useAuth } from "../../utils/auth";
import { getUserBooking } from "../../utils/fetchFromApi";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';



const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const { authState, logout } = useAuth();
  const navigate = useNavigate();


  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    handleMenuClose()
  };

  const handleLogout = () => {
    logout();
  };

  const goToProfile = async () => {
    navigate('/account/profile')
    setMenuAnchor(null);
  };
  const goToBooking = async () => {
    navigate('/account/bookings')
    setMenuAnchor(null);
  };


  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <Stack direction="row" p={2} sx={{ background: '##FFFFFF', justifyContent: "space-between", boxShadow: 3 }} >
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={logo} alt="logo" height={50} />
      </Link>
      {authState.token ? (
        <>
          <Button variant="text" onClick={handleMenuOpen} startIcon={<AccountCircleOutlinedIcon />}>
            My Account
          </Button>
          <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={goToProfile}>View Profile</MenuItem>
            <MenuItem onClick={goToBooking}>View Bookings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <Button variant="contained" onClick={handleOpenModal}>
          Login/Signup
        </Button>
      )}
      <LoginModal open={modalOpen} onClose={handleCloseModal} />
    </Stack>
  );
};

export default Navbar;
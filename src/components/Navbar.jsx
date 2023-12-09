import { Stack , Button} from "@mui/material";
import { Link } from "react-router-dom";
import logo from '../images/Cleartrip-New-Logo.png'


const Navbar = () => (
  <Stack direction="row"  p={2}  sx={{  background: '##FFFFFF',  justifyContent: "space-between" , boxShadow: 3 }} >
    <Link to="/" style={{ display: "flex", alignItems: "center" }}>
      <img src={logo} alt="logo" height={50} />
    </Link>
    <Button variant="contained">Login/Signup</Button>
  </Stack>
);

export default Navbar;
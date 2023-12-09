import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from '@mui/material';
import Flight from './components/Flight';
import Bus from './components/Bus';
import Navbar from './components/Navbar'
import Feed from  './components/Feed.jsx'
import './index.css'

const App = () => (
  <BrowserRouter>
    <Box sx={{ backgroundColor: '#FFFFFF' }}>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Feed />} />
        <Route path='/Flight' element={<Flight />} />
        <Route path='/Bus' element={<Bus />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
import { useState } from "react";
import { Box, Stack ,Typography} from "@mui/material";
import Sidebar from './Sidebar';
import Flight from './Flight.jsx'
import Hotels from './Hotels.jsx';
import Bus from './Bus.jsx'


const Feed = () => {
    const [selectedCategory, setSelectedCategory] = useState("Flights");
    return (
        <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
          <Box sx={{ height:"90vh",  sx: "auto", md: "92vh" , borderRight: "1px solid #3d3d3d", px: { sx: 0, md: 2 } }}>
            <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />        
          </Box>

      <Box p={2} sx={{height: "90vh"}}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "black" }}>
          Search <span style={{ color: "black" }}>{selectedCategory} </span>
        </Typography>
        {(() => {
        switch (selectedCategory) {
          case 'Flights':
            return <Flight/>;
          case 'Hotels':
            return <Hotels />;
          case 'Bus':
            return <Bus />;
          default:
            return <div>Default component</div>;
        }
      })()}
      </Box>
        </Stack>
      );
}

export default Feed

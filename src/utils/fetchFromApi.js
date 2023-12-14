import axios from 'axios';

export const BASE_URL = ' https://academics.newtonschool.co';
const options = {
  headers: {
    'projectID': 'f104bi07c490'
  }
};

export const searchFlight = async (source, destination, day) => {
  const { data } = await axios.get(`${BASE_URL}/api/v1/bookingportals/flight/?search=${JSON.stringify({ "source": source, "destination": destination })}&day=${day}`, options);
  return data;

};


export const searchHotels = async (location,day) =>{
  const { data } = await axios.get(`${BASE_URL}/api/v1/bookingportals/hotel/?search=${JSON.stringify({ "location": location})}`, options);
  console.log(data);
  return data;
};
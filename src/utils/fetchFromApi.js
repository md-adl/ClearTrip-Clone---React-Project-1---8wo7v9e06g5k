import axios from 'axios';
import { json } from 'react-router-dom';

export const BASE_URL = ' https://academics.newtonschool.co';
const options = {
  headers: {
    'projectID': 'f104bi07c490'
  }
};

export const getUserBooking = async (token) => {
  console.log(token)
  try {
    options.headers['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${BASE_URL}/api/v1/bookingportals/booking`,
      options);
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};


export const postUserBooking = async (token, bookingType, bookingId, startDate, endDate) => {

  try {
    options.headers['Authorization'] = `Bearer ${token}`;
    const response = await axios.post(`${BASE_URL}/api/v1/bookingportals/booking`,
      {
        "bookingType": bookingType,
        "bookingDetails": {
          [`${bookingType}Id`]: bookingId,
          "startDate": startDate,
          "endDate": bookingType == "flight" ? startDate : endDate
        }
      },
      options);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const userSignUp = async (name, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/bookingportals/signup`, {
      name: name,
      email: email,
      password: password,
      appType: 'bookingportals',
    }, options);

    return response.data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

export const userLogin = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/bookingportals/login`, {
      email: email,
      password: password,
      appType: 'bookingportals',
    }, options);

    return response.data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const searchFlight = async (source, destination, day) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/bookingportals/flight?search=${JSON.stringify({ "source": source, "destination": destination })}&day=${day}`, options);
    return data;
  } catch (error) {
    console.error('Error searching for flights:', error);
    throw error;
  }
};

export const searchHotel = async (location) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/bookingportals/hotel?search=${JSON.stringify({"location":location})}`, options);
    return data;
  } catch (error) {
    console.error('Error searching for hotels:', error);
    throw error;
  }
};

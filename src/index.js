// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Home from "./components/Home/Home.jsx";
import Flight from "./components/Flight/Flight";
import FlightResult from "./components/Flight/FlightResult";
import ErrorPage from "./components/Home/ErrorPage.jsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Hotel from "./components/Hotels/Hotel";
import { AuthProvider } from "./utils/auth";
import FlightCheckOut from "./components/Flight/FlightCheckOut";
import HotelResult from "./components/Hotels/HotelResult";
import { BookingContextProvider } from "./utils/bookingContext";
import PaymentForm from "./components/Flight/PaymentForm.jsx";
import UserBookings from "./components/Booking/UserBookings.jsx";
import UserProfile from "./components/Booking/UserProfile.jsx";
import Account from "./Model/Account.jsx";
import HotelDetails from "./components/Hotels/HotelDetails";
import HotelCheckOut from './components/Hotels/HotelCheckOut';
import PaymentFormhotel from './components/Hotels/PaymentFormhotel'
import Bus from "./components/Bus/Bus.jsx";
import Offer from "./components/Offer/Offer.jsx";
import Support from "./components/Support/Support.jsx"
import Mytrip from "./components/MyTrip/Mytrip.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Flight />,
        children: [
          {
            path: "flights",
            element: <Flight />,
          },
        ]
      },
      {
        path: "hotels",
        element: <Hotel />,
      },
      {
        path: "bus",
        element: <Bus/>
      },
      {
        path: "offer",
        element: <Offer/>
      },
      {
        path: "support",
        element: <Support/>
      },
      {
        path: "Mytrip",
        element: <Mytrip/>
      },
    ],
  },
  {
    path: "account",
    element: <Account />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/account",
        element: <UserBookings />,
        children: [{
          path: "/account/bookings",
          element: <UserBookings />,
        },
        ]
      },
      {
        path: "/account/profile",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "flight/result",
    element: <FlightResult />,
    errorElement: <ErrorPage />,
  },
 
  {
    path: "hotel/result",
    element: <HotelResult />,
    errorElement: <ErrorPage />,
  },
  {
    path: "flight/checkout",
    element: <FlightCheckOut />,
    errorElement: <ErrorPage />,
  },
  {
    path: "hotel/checkout",
    element: <HotelCheckOut />,
    errorElement: <ErrorPage />,
  },
  {
    path: "hotel/checkout/payment",
    element: <PaymentFormhotel />,
    errorElement: <ErrorPage />,
  },
  {
    path: "hotel/detail",
    element: <HotelDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "flight/checkout/payment",
    element: <PaymentForm />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BookingContextProvider>
        <RouterProvider router={router} />
      </BookingContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
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
import Home from "./components/Home";
import Flight from "./components/Flight";
import FlightResult from "./components/FlightResult";
import ErrorPage from "./components/ErrorPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Hotel from "./components/Hotel";
import { AuthProvider } from "./utils/auth";
import FlightCheckOut from "./components/FlightCheckOut";
import HotelResult from "./components/HotelResult";
import HotelDetail from "./components/HotelDetails";
import { BookingContextProvider } from "./utils/bookingContext";
import PaymentForm from "./components/PaymentForm";
import UserBookings from "./components/UserBookings";
import UserProfile from "./components/UserProfile";
import Account from "./components/Account";
import HotelDetails from "./components/HotelDetails";

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
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
import HotelResult from "./components/HotelResult";
import HotelDetails from "./components/HotelDetails";
import FlightCheckOut from "./components/FlightCheckOut";

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
    path: "flights/results",
    element: <FlightResult />,
    errorElement: <ErrorPage />,
  },
  {
    path: "hotels/results",
    element: <HotelResult />,
    errorElement: <ErrorPage />,
  },
  {
    path: "hotels/results/detail",
    element: <HotelDetails />,
    errorElement: <ErrorPage />,
  },
  {
    path: "flights/results/checkout",
    element: <FlightCheckOut />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
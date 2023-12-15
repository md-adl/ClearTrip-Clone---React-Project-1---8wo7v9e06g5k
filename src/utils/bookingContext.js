import React, { createContext, useContext, useState } from "react";


const BookingContext = createContext();


export const BookingContextProvider = ({ children }) => {

    const [bookingValues, setBookingValue] = useState({});

    function setType(type) {
        const newValue = { ...bookingValues, 'type': type };
        setBookingValue(newValue);
    }
    function setId(Id) {
        const newValue = { ...bookingValues, 'id': Id };
        setBookingValue(newValue);
    }
    function setPrice(price) {
        const newValue = { ...bookingValues, 'price': price };
        setBookingValue(newValue);
    }
    function setStartDate(date) {
        const newValue = { ...bookingValues, 'startDate': date };
        setBookingValue(newValue);

    }
    function setEndDate(date) {
        const newValue = { ...bookingValues, 'endDate': date };
        setBookingValue(newValue);
    }


    const bookingContext = { bookingValues, setType, setId, setStartDate, setEndDate, setPrice };

    return (<BookingContext.Provider value={bookingContext}>
        {children}
    </BookingContext.Provider>);
}

export const useBookingContext = () => {
    const context = useContext(BookingContext);
    return context;
}
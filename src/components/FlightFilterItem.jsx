import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Checkbox,
    Typography,
    FormGroup,
    FormControlLabel,
    Collapse,
    Slider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FlightFilterItem = ({ label, options, isSlider, range, onFilterChange }) => {
    const [checkedItems, setCheckedItems] = useState([]);
    const [priceRange, setPriceRange] = useState([]);

    useEffect(() => {
        if (range && range.length === 2) {
            setPriceRange([range[0], range[1]]);
        }
    }, [])

    useEffect(() => {
        const flightFilter = {
            checkedItems: checkedItems,
            priceRange: priceRange,
        };
        onFilterChange(flightFilter);
    }, [checkedItems, priceRange]);

    const handleCheckboxChange = useCallback((value) => {
        setCheckedItems((prev) => {
            if (prev.includes(value)) {
                return prev.filter((item) => item !== value);
            } else {
                return [...prev, value];
            }
        });
    }, []);

    const handlePriceChange = (event, newValue) => {
        setPriceRange([range[0], newValue]);
    };

    return (
        <Collapse in={true}>
            <Accordion defaultExpanded={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ fontWeight: "bold" }}>{label}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {isSlider ?
                        <Box>
                            <Slider
                                sx={{
                                    '& .MuiSlider-thumb': {
                                        color: '#fff',
                                        border: '2px solid #FF4F17',
                                        height: '25px',
                                        width: '25px',
                                    },
                                    '& .MuiSlider-track': {
                                        color: '#FF4F17',
                                    },
                                }}
                                border={5}
                                aria-label="Price"
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                defaultValue={range[1]}
                                min={range[0]}
                                max={range[1]}
                                valueLabelFormat={(value) => `₹${value}`}
                            />
                            <Box display="flex" justifyContent="space-between" color="#999">
                                <Typography variant="caption">₹{range[0]}</Typography>
                                <Typography variant="caption">₹{range[1]}</Typography>
                            </Box>
                        </Box>

                        :
                        options.map((option) => (
                            <FormGroup key={option.value}>
                                <FormControlLabel control={<Checkbox checked={checkedItems.includes(option.value)}
                                    onChange={() => handleCheckboxChange(option.value)} />} label={option.label} />
                            </FormGroup>
                        ))
                    }


                </AccordionDetails>
            </Accordion>
        </Collapse>
    );
};

export default FlightFilterItem;

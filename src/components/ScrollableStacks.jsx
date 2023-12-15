// ScrollableStacks.js
import React, { useState, useEffect } from 'react';
import { Stack, Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/system';

const LeftStack = styled('div')(({ theme, isLeftStackSticky }) => ({
    position: isLeftStackSticky ? 'fixed' : 'static',
    top: 0,
    backgroundColor: "red",
    zIndex: 1,
}));

const RightStack = styled(Stack)(({ theme }) => ({
    marginLeft: theme.spacing(3), // Adjust as needed
}));

const ScrollableStacks = () => {
    const [isLeftStackSticky, setIsLeftStackSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            // Adjust the threshold as needed
            setIsLeftStackSticky(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <Stack direction="row">
                <LeftStack isLeftStackSticky={isLeftStackSticky} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }} spacing={2}>
                    {/* Content for the left stack */}
                    <Box elevation={3} sx={{ p: 2 }}>
                        <Typography variant="h6">Left Stack</Typography>
                        <Typography>Sticky content goes here</Typography>
                    </Box>
                </LeftStack>
                <RightStack spacing={2}>
                    {/* Content for the right stack */}
                    <List>
                        {[...Array(20).keys()].map((index) => (
                            <ListItem key={index} sx={{ mb: 2 }}>
                                <ListItemText primary={`Item ${index + 1}`} />
                            </ListItem>
                        ))}
                    </List>
                </RightStack>
            </Stack>
        </div>
    );
};

export default ScrollableStacks;

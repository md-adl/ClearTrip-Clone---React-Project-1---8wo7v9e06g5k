// LoginSignupModal.js
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { userSignUp, userLogin } from '../utils/fetchFromApi';
import { useAuth } from '../utils/auth';

const LoginModal = ({ open, onClose }) => {
    const [email, setEmail] = useState("rohit673.mail@gmail.com");
    const [password, setPassword] = useState("123456");
    const [username, setUsername] = useState("rohit");
    const [isSignup, setIsSignup] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(null);
    const [signinSuccess, setSigninSuccess] = useState(null);
    const { setAuth } = useAuth();

    const handleLogin = async () => {

        try {
            const response = await userLogin(email, password);
            if (response.status === 'success') {
                console.log(response)
                setAuth(response.token, response.data);
                setSigninSuccess('Signin successful!');
                handleClose();
            } else {
                setSigninSuccess('Error during signin. Please try again.');
            }
        } catch (error) {
            if (error.response.data.message != null) {
                setSigninSuccess(`Error during signin. ${error.response.data.message}`);
            }
            else {
                setSigninSuccess('Error during signin. Please try again');
            }
        }

    };

    const handleSignup = async () => {

        try {
            const response = await userSignUp(username, email, password);

            if (response.status === 'success') {
                setAuth(response.token, response.data.user);
                setSignupSuccess('Signup successful!');
                console.log(response);
            } else {
                console.error('Error during signup:', response);
                setSignupSuccess('Error during signup. Please try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            if (error.response.data.message != null) {
                setSignupSuccess(`Error during signup. ${error.response.data.message}`);
            }
            else {
                setSignupSuccess('Error during signup. Please try again');
            }

        }
        handleClose();
    }


    const toggleSignup = () => {
        setIsSignup(!isSignup);
        setUsername('');
    };

    const handleClose = () => {
        onClose();
        setSignupSuccess(null);
        setSigninSuccess(null);
    };

    return (
        <Modal open={open} onClose={onClose} centered>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 300,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Button
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                    }}
                >
                    Close
                </Button>
                <Typography variant="h5" align="center" gutterBottom>
                    {isSignup ? 'Sign Up' : 'Login'}
                </Typography>
                {signupSuccess && (
                    <Typography variant="body1" color="green" align="center" mb={2}>
                        {signupSuccess}
                    </Typography>
                )}
                {signinSuccess && (
                    <Typography variant="body1" color="green" align="center" mb={2}>
                        {signinSuccess}
                    </Typography>
                )}
                {isSignup && (
                    <TextField
                        label="Username"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                )}
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={isSignup ? handleSignup : handleLogin}
                >
                    {isSignup ? 'Sign Up' : 'Login'}
                </Button>
                <Typography variant="body2" align="center" mt={2}>
                    {isSignup ? (
                        <>
                            Already have an account?{' '}
                            <Button color="primary" onClick={toggleSignup}>
                                Login
                            </Button>
                        </>
                    ) : (
                        <>
                            Don't have an account?{' '}
                            <Button color="primary" onClick={toggleSignup}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </Typography>
            </Box>
        </Modal>
    );
}


export default LoginModal;

import React, { useEffect, useState } from 'react';
import { Collapse, IconButton } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import Box from '@material-ui/core/Box';
import { Redirect } from 'react-router';
import { postUserApi } from '../../state/user/authentication';
import { Link } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertOpen, setAlertOpen] = useState(true);
    const [errorMessages, setErrorMessages] = useState({});
    const [result, setResult] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        // new user attributes
        const newUser = {
            username,
            fullName,
            password,
            confirmPassword,
        };
        setErrorMessages({});

        // make a post request
        postUserApi(newUser, 'register')
            .then((data) => {
                setResult(data);
            })
            .catch(setErrorMessages);
    };
    useEffect(() => {
        setAlertOpen(!!errorMessages['message']);
    }, [errorMessages]);

    return (
        <Container maxWidth="sm">
            {/* redirect to login page if user registered */}
            {result && <Redirect to="/login" />}
            {result && 'Redirecting'}
            <h1>Business Registration</h1>
            <form onSubmit={onSubmit}>
                <TextField
                    error={!!errorMessages['username']}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoFocus
                    helperText={errorMessages['username']}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    error={!!errorMessages['fullName']}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    value={fullName}
                    helperText={errorMessages['fullName']}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                    error={!!errorMessages['password']}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    helperText={errorMessages['password']}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    error={!!errorMessages['confirmPassword']}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    helperText={errorMessages['confirmPassword']}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Link to="/businessRegister">Business Register</Link>
                <Box mt={1}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign Up
                    </Button>
                </Box>
                {errorMessages['message'] && (
                    <Collapse in={alertOpen}>
                        <Alert
                            severity="warning"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setAlertOpen(false);
                                    }}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            }
                        >
                            {errorMessages['message']}
                        </Alert>
                    </Collapse>
                )}
            </form>
        </Container>
    );
}

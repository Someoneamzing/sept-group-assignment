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

export default function BusinessRegister() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertOpen, setAlertOpen] = useState(true);
    const [errorMessages, setErrorMessages] = useState({});
    const [result, setResult] = useState(false);
    const [abn, setAbn] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            'user': {
                username,
                fullName,
                password,
                confirmPassword,
            }, 'businessInfo':
                { abn }
        };

        setErrorMessages({});

        // make a post request
        postUserApi(newUser, 'businessRegister')
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
                    error={!!errorMessages['user.username']}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="username"
                    label="User Name"
                    name="username"
                    autoFocus
                    helperText={errorMessages['user.username']}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    error={!!errorMessages['user.fullName']}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="fullName"
                    label="Full Name"
                    name="fullName"
                    autoFocus
                    value={fullName}
                    helperText={errorMessages['user.fullName']}
                    onChange={(e) => setFullName(e.target.value)}
                />
                <TextField
                    error={!!errorMessages['user.password']}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    helperText={errorMessages['user.password']}
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
                <TextField
                    error={!!errorMessages['businessInfo.ABN']}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="ABN"
                    label="ABN"
                    name="ABN"
                    autoFocus
                    value={abn}
                    helperText={errorMessages['businessInfo.ABN']}
                    onChange={(e) => setAbn(e.target.value)}
                />
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

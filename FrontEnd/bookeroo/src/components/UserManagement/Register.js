// import React, { Component } from 'react'
import {Button} from '@material-ui/core';
import {Container} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import {useState} from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {username, fullName, password, confirmPassword};

        console.log(newUser);

        // post request to spring boot
        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser),
        })
            .then((response) => {
                response.json().then((data) => {
                    // console.log(data);

                    // errros occured in the form
                    if (response.status !== 201) {
                        debugger;
                        setErrorMessages(data);
                    } else {
                        alert('user created');
                        setErrorMessages({});
                    }
                });
            })
            .catch((e) => {
                alert('Failed to connect to the backend');
            });
    };

    return (
        <div className="register">
            <Container maxWidth="sm">
                <h1> Bookeroo Registration </h1>

                {/* {registration form } */}
                <form className="form" onSubmit={onSubmit}>
                    <TextField
                        error={errorMessages['username']}
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
                        error={errorMessages['fullName']}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="fullName"
                        label="Full Name"
                        name="fullName"
                        autoFocus
                        value={fullName}
                        helperText={errorMessages['fullName']}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <TextField
                        error={errorMessages['password']}
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
                        name="confirmPassword"
                        autoFocus
                        value={confirmPassword}
                        helperText={errorMessages['confirmPassword']}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                </form>
            </Container>
        </div>
    );
};

export default Register;

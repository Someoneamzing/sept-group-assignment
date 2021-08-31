// import React, { Component } from 'react'
import { Button } from '@material-ui/core';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import { useState } from "react";


const Register = () => {

    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userType, setUserType] = useState('PUBLIC');

    const [inValidUsername, setInValidUsername] = useState(false);
    const [inValidFullName, setInValidFullName] = useState(false);
    const [inValidPassword, setInValidPassword] = useState(false);
    const [inValidConfirmPassword, setInValidConfirmPassword] = useState(false);

    const [errorMessages, setErrorMessages] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = { username, fullName, password, confirmPassword, userType };

        console.log(newUser)

        // post request to spring boot
        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        }).then(response => {
            response.json().then(data => {
                // console.log(data);

                // errros occured in the form
                if (response.status !== 201) {
                    setErrorMessages(data);
                    for (const key in data) {
                        if (key === "username") {
                            setInValidUsername(true);
                        } else if (key === "fullName") {
                            setInValidFullName(true);
                        } else if (key === "password") {
                            setInValidPassword(true);
                        } else if (key === "confirmPassword") {
                            setInValidConfirmPassword(true);
                        }
                    }
                } else {
                    alert("user created")
                    setErrorMessages([]);
                    setInValidUsername(false);
                    setInValidFullName(false);
                    setInValidPassword(false);
                    setInValidConfirmPassword(false);
                }
            })
        }).catch(e => {
            alert("Failed to connect to the backend")
        })

    }

    return (
        <div className="register">
            <Container maxWidth="sm">
                <h1> Bookeroo Registration </h1>

                {/* {registration form } */}
                <form className="form" onSubmit={onSubmit}>
                    <TextField
                        error={inValidUsername}
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
                        error={inValidFullName}
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
                        error={inValidPassword}
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
                        error={inValidConfirmPassword}
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
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                            Sign Up
                        </Button>
                    </Box>

                </form>
            </Container>
        </div>
    )
}

export default Register

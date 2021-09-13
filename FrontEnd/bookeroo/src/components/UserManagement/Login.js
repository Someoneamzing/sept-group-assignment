import {
    Box,
    Button,
    Collapse,
    Container,
    IconButton,
    TextField,
} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import {useRecoilState} from 'recoil';
import {userAtom} from '../../state/user/authentication';
import {Redirect} from 'react-router';

export default function Login() {
    const [userState, setUserState] = useRecoilState(userAtom);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertOpen, setAlertOpen] = React.useState(true);

    const [errorMessages, setErrorMessages] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();
        const signIn = {
            username,
            password,
        };
        setErrorMessages({});

        // post request to spring boot
        fetch('http://localhost:8080/api/users/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(signIn),
        })
            .then((response) => {
                response.json().then((data) => {
                    if (response.status !== 200) {
                        setErrorMessages(data);
                    } else {
                        const {authorities, token} = data;
                        setUserState({username, authorities, token});
                        setErrorMessages({});
                    }
                });
            })
            .catch((e) => {
                alert('Failed to connect to the backend');
            });
    };
    useEffect(() => {
        setAlertOpen(!!errorMessages['message']);
    }, [errorMessages]);

    return (
        <Container maxWidth="sm">
            {/* redirect to homepage if user logged in */}
            {userState && userState.token && <Redirect to="/" />}
            <h1> Bookeroo Sign In </h1>

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
                <Box mt={1} marginBottom={3}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Sign In
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

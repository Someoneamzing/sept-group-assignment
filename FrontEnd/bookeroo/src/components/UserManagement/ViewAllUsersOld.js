import {Box, Container} from '@material-ui/core';
import React, {Suspense} from 'react';
import {Link} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {userAtomFamily, useAllUsersQuery} from '../../state/user/users';
import NoMatch from '../Layout/NoMatch';
import { AccountActions } from './AccountActions';
import {Paper, Button, FormControl, InputLabel, Select, MenuItem, Typography} from '@material-ui/core';

function UserListItem({userId}) {
    const userData = useRecoilValue(userAtomFamily(userId));

    if (userData == null) {
        return 'User Not Found';
    }

    return (
        <Box paddingBottom="2vh">
            <Paper variant="outlined">
                <Box width="100%"
                    maxWidth="sm"
                    display="flex"
                    flexWrap="wrap"
                    flexDirection="row"
                    justifyContent="space-evenly"
                >       
                    <Link to={`/user/${userId}`}>
                        <Box 
                            display="flex"
                            flexDirection="row"
                            justifyContent="space-evenly"
                        >   
                            {/* <Box
                            display="flex"
                            flexDirection="column"
                            paddingRight="10vh">
                                <Typography variant="h6">Username: {userData.username}</Typography>
                                <Typography variant="h6">Name: {userData.fullName}</Typography>
                                <Typography variant="h6">Usertype: {userData.authorities.map(a => a.authority)}</Typography>
                            </Box> */}
                            <Box
                            display="flex"
                            flexDirection="column"
                            // flex= "0 0 100%"
                            paddingRight="10vh">
                                <Typography variant="h6">Username:</Typography>
                                <Typography variant="h6">{userData.username}</Typography>
                               
                            </Box>
                            <Box
                            display="flex"
                            flexDirection="column"
                            paddingRight="10vh">
                                <Typography variant="h6">Name: </Typography>
                                <Typography variant="h6">{userData.fullName}</Typography>
                            </Box>
                            <Box
                            display="flex"
                            flexDirection="column"
                            paddingRight="10vh">
                                <Typography variant="h6">Usertype: </Typography>
                                <Typography variant="h6">{userData.authorities.map(a => a.authority)}</Typography>
                            </Box>
                        </Box>
                    </Link>
                    {/* <Box
                        display="flex"
                        flexDirection="row"
                        flex= "0 0 30%"
                        justifyContent="space-around"
                    >
                        <AccountActions{...userData}/>
                    </Box> */}
                </Box> 
            </Paper>
        </Box>   
    );
}

function ViewAllUsersLayout() {
    const {allUsers} = useAllUsersQuery();

    if (allUsers.length) {     
        return (
            <Container maxWidth="lg">
                <h1>(debug) view all users</h1>
                <Box display="flex" flexDirection="column" width="100%">
                    {allUsers.map((n) => (
                        <Suspense fallback="loading user" key={n}>
                            <UserListItem userId={n} />
                        </Suspense>
                    ))}
                </Box>
            </Container>
        );
    } else {
        return <NoMatch/ >;
    } 
}

export default function ViewAllUsersPage() {
    return (
        <Suspense fallback="loading all users">
            <ViewAllUsersLayout />
        </Suspense>
    );
}
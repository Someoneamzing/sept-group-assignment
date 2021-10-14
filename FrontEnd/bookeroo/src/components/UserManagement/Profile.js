import {Box, Container, Paper, Typography} from '@material-ui/core';
import React, {Suspense} from 'react';
import {Link} from 'react-router-dom';
import {currentUserAtomFamily, useAllUsersQuery, useUser} from '../../state/user/users';
import NoMatch from '../../components/Layout/NoMatch';
import User from '../../state/user/authentication';
import axios from 'axios';
import {useEffect} from 'react';
import {userAtom} from '../../state/user/authentication';
import EditUser from './EditUser';
import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
    selector,
} from 'recoil';

function UserPofile() {
    const userData = useUser();
    const isBuisness = userData.businessInfo == null ? false : true;

    if (userData == null) {
        return <NoMatch />;
    }

    return (
        <Container maxWidth="sm">
            <Paper variant="outlined" >
                <Box padding="3vh">
                    <Typography variant="h3"> Profile </Typography>
                    <Box padding="1vh" >
                        <Typography variant="h6"> Name: {userData.fullName} </Typography>
                        <Typography variant="h6"> Username: {userData.username} </Typography>
                        {/* <Typography variant="h6"> Account type: {userData.authorities.map((a) => a.authority)} </Typography> */}
                        {isBuisness ? (
                            <Typography variant="h6"> ABN: {userData.businessInfo} </Typography>
                        ) : (
                            null
                        )}      
                    </Box>            
                </Box>
                <Box align="right" marginBottom="1vh" marginRight="1vh">
                    <EditUser/>
                </Box> 
            </Paper>
        </Container>
    );
}

export default function Profile() {
    return (
        <Suspense fallback="loading user">
            <UserPofile />
        </Suspense>
    );
}

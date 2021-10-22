import {Box, Container, Paper, Typography} from '@material-ui/core';
import {React, Suspense} from 'react';
import {useUser} from '../../state/user/users';
import NoMatch from '../../components/Layout/NoMatch';
import EditUser from './EditUser';

export function UserPofile(userData) {
    const isBuisness = userData.businessInfo == null ? false : true;

    if (userData == null) {
        return <NoMatch />;
    }

    return (
        <Box width="100%">
            <Paper variant="outlined">
                <Box padding="3vh">
                    <Typography variant="h3">Profile</Typography>
                    <Box padding="1vh">
                        <Typography variant="h6">
                            Name: {userData.fullName}
                        </Typography>
                        <Typography variant="h6">
                            Username: {userData.username}
                        </Typography>
                        <Typography variant="h6">
                            Account type:{' '}
                            {userData.authorities
                                .map((a) => a.authority)
                                .join(', ')}
                        </Typography>
                        {isBuisness ? (
                            <Typography variant="h6">
                                ABN: {Object.values(userData.businessInfo)}
                            </Typography>
                        ) : null}
                    </Box>
                </Box>
                <Box align="right" marginBottom="1vh" marginRight="1vh">
                    <EditUser {...userData} />
                </Box>
            </Paper>
        </Box>
    );
}

function ViewProfile() {
    const userData = useUser(null);
    return (
        <>
            <Container maxWidth="sm">
                <UserPofile {...userData} />
            </Container>
        </>
    );
}

export default function Profile() {
    return (
        <>
            <Suspense fallback={<div>Loading user... </div>}>
                <ViewProfile />
            </Suspense>
        </>
    );
}

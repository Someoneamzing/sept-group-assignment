import {Box, Container} from '@material-ui/core';
import React, {Suspense} from 'react';
import {Link} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {userAtomFamily, useAllUsersQuery} from '../../state/user/users';
import NoMatch from '../../components/Layout/NoMatch';

function UserListItem({userId}) {
    const userData = useRecoilValue(userAtomFamily(userId));

    if (userData == null) {
        return 'User Not Found';
    }

    return (
        <Box width="100%">
            <Link to={`/user/${userId}`}>
                {userData.username}
                · {userData.fullName}
                · {userData.accountNonLocked.toString()}
                · {userData.enabled.toString()} 
                · {userData.authorities.map(a => a.authority)} 
            </Link>
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
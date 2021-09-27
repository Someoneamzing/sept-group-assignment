import {Box, Container} from '@material-ui/core';
import React, {Suspense} from 'react';
import {Link} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {userAtomFamily, useAllUsersQuery} from '../../state/user/users';

function UserListItem({userId}) {
    const userData = useRecoilValue(userAtomFamily(userId));

    if (userData == null) {
        return 'Book Not Found';
    }

    return (
        <Box width="100%">
            <Link to={`/user/${userId}`}>
                {userData.userName} · {userData.authorities}
            </Link>
        </Box>
    );
}

function ViewAllUsersLayout() {
    const {allUsers} = useAllUsersQuery();

    return (
        <Container maxWidth="lg">
            <h1>(debug) view all users</h1>
            <Box display="flex" flexDirection="column" width="100%">
                {allUsers.map((n) => (
                    <Suspense fallback="loading book" key={n}>
                        <UserListItem userId={n} />
                    </Suspense>
                ))}
            </Box>
        </Container>
    );
}

export default function ViewAllUsersPage() {
    return (
        <Suspense fallback="loading all books">
            <ViewAllUsersLayout />
        </Suspense>
    );
}
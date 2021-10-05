import {Box, Container} from '@material-ui/core';
import React, {Suspense} from 'react';
import {Link} from 'react-router-dom';
import {currentUserAtomFamily, useAllUsersQuery} from '../../state/user/users';
import NoMatch from '../../components/Layout/NoMatch';
import User from '../../state/user/authentication';
import axios from 'axios';
import {useEffect} from 'react';
import {userAtom} from '../../state/user/authentication';
import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
	selector,
} from 'recoil';


function UserPofile() {
    const userData = useRecoilValue(currentUserAtomFamily());

    if (userData == null) {
        return <NoMatch />;
    }

    return (
        <Box width="100%">
                {userData.username}
                · {userData.fullName}
                · {userData.accountNonLocked.toString()}
                · {userData.enabled.toString()} 
                · {userData.authorities.map(a => a.authority)} 
        </Box>
    );
}

export default function Profile() {
  return (
      <Suspense fallback="loading user">
          <UserPofile />
      </Suspense>
  );
}
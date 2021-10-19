import { useParams } from 'react-router-dom';
import { React, Suspense } from 'react';
import { useUser } from '../../state/user/users';
import NoMatch from '../Layout/NoMatch';
import {Container, Paper, Box} from '@material-ui/core';
import { UserPofile } from './Profile';
import { AccountActions } from './AccountActions';

function UserHeader(props) {
    const {userId} = props;
    return (
        <Box textAlign="left" padding="1rem">
            <h1> Edit User #{userId} </h1>
        </Box>
    );
}

function UserInfo(props) {
    return (
        <UserPofile{...props}/>
    );
}

function AccountInfo(props) {
    return (
        <AccountActions{...props}/>
    );
}

export function ViewUserLayout(props) {
    return (
        <div>
            <Container maxWidth="lg">
                <Box
                    maxWidth="sm"
                    display="flex"
                    flexWrap="wrap"
                    flexDirection="row"
                    justifyContent="space-between"
                >	
					<Box
                        display="flex"
						flex= "0 0 100%"
                        flexDirection="row"
                    >
                        <UserHeader {...props} />
                    </Box>	
                    <Box
                        maxWidth="sm"
                        display="flex"
                        flex= "0 0 60%"
                        flexWrap="wrap"
                        flexDirection="row"
                        justifyContent="space-around"
                        paddingBottom="2vh"
                    >
                        <UserInfo {...props} />
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="row"
                        flex= "0 0 30%"
                        justifyContent="space-around"
                    >
                        <Box width="100%">
                            <Paper variant="outlined">
                                <AccountInfo {...props} />
                            </Paper>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}

function ViewUserContainer({userId}) {
	const userData = useUser(userId);

	if (userData == null) {
		return <NoMatch />;
	}

	return (
		<>
			<ViewUserLayout
				{...{...userData, userId}}
				RightBox={<><h1>User Status</h1></>}
			/>
		</>
	);
}

export function ViewUserSuspense({userId}) {
  return (
      <Suspense fallback="loading user">
          <ViewUserContainer userId={userId} />
      </Suspense>
  );
}

export default function ViewUserPage() {
  const {userId} = useParams();

  return (
        <>
          <ViewUserSuspense userId={userId} />
      </>
  );
}
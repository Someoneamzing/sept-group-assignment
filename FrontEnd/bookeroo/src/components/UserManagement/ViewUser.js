import {useParams} from 'react-router-dom';
import React, {Suspense} from 'react';
import {useRecoilValue} from 'recoil';
import {userAtomFamily} from '../../state/user/users';
import NoMatch from '../Layout/NoMatch';
import {Container, Paper, Box} from '@material-ui/core';

function UserHeader(props) {
    const {userId} = props;
    return (
        <Box textAlign="left" padding="1rem">
            <h1> Edit User {userId} </h1>
        </Box>
    );
}

function UserInfo(props) {
    const {username, userId} = props;
    return (
        <Box textAlign="left" padding="1rem">
            <h1> {userId} </h1>
			<h1> {username} </h1>
        </Box>
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

					<Paper variant="outlined">
						<Box
							maxWidth="sm"
							display="flex"
							flexWrap="wrap"
							flexDirection="row"
							justifyContent="space-around"
						>
							<UserInfo {...props} />
						</Box>
					</Paper>

                    <Paper variant="outlined">
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-around"
                            margin="2rem"
                            height="85%"
                        >
                            {props.RightBox}
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </div>
    );
}

function ViewUserContainer({userId}) {
	const userData = useRecoilValue(userAtomFamily(userId));

	if (userData == null) {
		return <NoMatch />;
	}
	return (
		<>
			<ViewUserLayout
				{...{...userData, userId}}
				RightBox={<>User Status</>}
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

export default function ViewBookPage() {
  const {userId} = useParams();

  return (
      <>
          <ViewUserSuspense userId={userId} />
      </>
  );
}
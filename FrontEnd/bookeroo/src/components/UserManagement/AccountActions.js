import {React, useState, useEffect} from 'react';
import {putUserApi} from '../../state/user/users';
import {Box, Button, Typography} from '@material-ui/core';
import { useAuthUser } from "../../state/user/authentication";

export function AccountActions(props) {
    const [user, setUser] = useState(props);
    const [account, setAccount] = useState({});
    const [accountUpdate, setAccountUpdate] = useState(false);
    const authUser = useAuthUser();
    const [buttonName, setButtonName] = useState('');

    const handleSuspend = (e) => {
        setAccount({
            ...account,
            accountNonLocked: !(user.accountNonLocked)
        });
        setUser({
            ...user,
            accountNonLocked: !(user.accountNonLocked)
        })
        setAccountUpdate(true);
    }

    const handleBuisness = (e) => {
        setAccount({
            ...account,
            enabled: !(user.enabled)
        });
        setUser({
            ...user,
            enabled: !(user.enabled)
        })
        setAccountUpdate(true);
    }

    useEffect(() => {
        if(accountUpdate){ 
            putUserApi(user.userId, account, authUser.token)
        } 

        if(user.accountNonLocked){
            setButtonName('Suspend');
        } else {
            setButtonName('Reactivate')
        };

    }, [account, authUser, accountUpdate, user]);

    return (
        <>
        <Box textAlign="left" padding="1rem">
            <Typography variant="h4"> Account Details </Typography>
            <Box
                display="flex"
                flexWrap="wrap"
                flexDirection="row"
                justifyContent="space-between"
                paddingTop="2vh"
            >
                <>
                    <Typography variant="h6"> {user.accountNonLocked ? 'Account active' : 'Account suspended'} </Typography> 
                    <Button variant="contained" color="secondary" onClick={handleSuspend} name="accountNonLocked">{buttonName}</Button>
                </>
            </Box>
        
            {user.enabled ? (
                null
            ) : (
                <Box
                display="flex"
                flexWrap="wrap"
                flexDirection="row"
                justifyContent="space-between"
                paddingTop="2vh"
                >   
                    <>
                        <Typography variant="h6">Buisness register request</Typography>
                        <Button variant="contained" color="secondary" onClick={handleBuisness}>Allow</Button>
                    </>
                </Box>
            )}   
        </Box>
        </>
    );
}

import {Box} from '@material-ui/core';
import React from 'react';
import {useLocation} from 'react-router-dom';

export default function NoMatch() {
    const location = useLocation();
    return (
        <Box margin="1rem">
            <h1>404</h1>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </Box>
    );
}

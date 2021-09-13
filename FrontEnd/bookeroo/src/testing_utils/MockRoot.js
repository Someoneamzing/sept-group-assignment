import {createMemoryHistory} from 'history';
import React from 'react';
import {Router} from 'react-router';
import {RecoilRoot} from 'recoil';

export default function WrapperRoot({children, ...props}) {
    if (!props.history) props.history = createMemoryHistory();
    return (
        <React.StrictMode>
            <RecoilRoot>
                <Router {...props}>{children}</Router>
            </RecoilRoot>
        </React.StrictMode>
    );
}

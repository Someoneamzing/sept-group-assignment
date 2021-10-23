import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {RecoilRoot} from 'recoil';

export default function Root() {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <RecoilRoot>
                    <App />
                </RecoilRoot>
            </BrowserRouter>
        </React.StrictMode>
    );
}

// https://create-react-app.dev/docs/adding-custom-environment-variables/
const API_ENDPOINT_ENV_VAR = process.env.REACT_APP_API_ENDPOINT;
if (!API_ENDPOINT_ENV_VAR) {
    console.log(
        'No ENV-VAR for REACT_APP_API_ENDPOINT - falling back to localhost'
    );
} else {
    console.log('LOADED ENV-VAR ENDPOINT: ' + API_ENDPOINT_ENV_VAR);
}

const API_ENDPOINT = API_ENDPOINT_ENV_VAR || 'localhost';

const LOGIN_MS_PORT = process.env.REACT_APP_LOGIN_MS_PORT || '8080';
const BOOK_MS_PORT = process.env.REACT_APP_BOOK_MS_PORT || '8081';

export const LOGIN_MS_ENDPOINT = API_ENDPOINT + ':' + LOGIN_MS_PORT;
export const BOOK_MS_ENDPOINT = API_ENDPOINT + ':' + BOOK_MS_PORT;

import axios from 'axios';
import {atom} from 'recoil';

const ENDPOINT = 'http://localhost:8080/api/users/login';

/**
 * Makes a request to the API to login with the given data.
 * @param {{username: string, password: string}} data
 * @returns {Promise<{authorities: string[], token: string}>} Promise that resolves with the server's response.
 * @throws {Promise<{[key: string]: string}>} object containing error messages for relevant fields
 */
export async function loginApi(data) {
    try {
        return (await axios.post(ENDPOINT, data)).data;
    } catch (e) {
        console.log(Object.keys(e));
        throw e.response.data;
    }
}

// const userState = {
//     authorities: ['ADMIN'],
//     token: 'Bearer bingbong',
//     username: 'bing bong',
// };

export const userAtom = atom({
    key: 'userAtom',
    default: null,
});

import axios from 'axios';
import {atom} from 'recoil';
import {recoilPersist} from 'recoil-persist';

debugger;
const { persistAtom } = recoilPersist();

const PATH = 'http://localhost:8080/api/users/';

/**
 * @typedef {{authorities: string[], token: string}} AuthRes
 * @typedef {any} RegisterRes
 * Makes a POST request to the user API with the given data.
 * @param {{username: string, password: string}} data
 * @param {string} endpoint e.g "login", "register"
 * @returns {Promise<AuthRes>} If requesting 'login' endpoint
 * @returns {Promise<RegisterRes>} If requesting 'register' endpoint
 * @throws {Promise<{[key: string]: string}>} object containing error messages for relevant fields
 */
export async function postUserApi(data, endpoint) {
    if (!endpoint) throw Error('endpoint not supplied');
    try {
        return (await axios.post(PATH + endpoint, data)).data;
    } catch (e) {
        if (e.response) {
            throw e.response.data;
        } else {
            // eslint-disable-next-line no-throw-literal
            throw {message: 'Could not connect to auth service'};
        }
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
    effects_UNSTABLE: [persistAtom],
});

import axios from 'axios';

import {BOOK_MS_ENDPOINT} from '../../env-vars';

export const BOOK_AXIOS_INSTANCE = axios.create({
    baseURL: `http://${BOOK_MS_ENDPOINT}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default BOOK_AXIOS_INSTANCE;

import {atom} from 'recoil';

// const userState = {
//     authorities: ['ADMIN'],
//     token: 'Bearer bingbong',
//     username: 'bing bong',
// };

export const userAtom = atom({
    key: 'userAtom',
    default: null,
});

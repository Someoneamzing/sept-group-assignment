import axios from 'axios';
import {atomFamily, selectorFamily, useRecoilValue} from 'recoil';
import {LOGIN_MS_ENDPOINT} from '../../../env-vars';

const PATH = `http://${LOGIN_MS_ENDPOINT}`;

const fetchBusinessUsers = async (sellerId) => {
    const queryURL = new URL('/api/users/search/findAllByIdIn', PATH);
    queryURL.searchParams.append('id', sellerId);
    const config = {
        config: 'GET',
        url: queryURL,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios(config);
        return res.data;
    } catch (e) {
        return null;
    }
};

const businessUsersAtomFamily = atomFamily({
    key: 'businesssUsersAtomFamily',
    default: selectorFamily({
        key: 'businessUsersAtomFamily/default',
        get: (sellerId) => async () => {
            const res = await fetchBusinessUsers(sellerId);
            if (res != null && !res.length) return null;
            return res[0];
        },
    }),
});

/**
 * @typedef {{id: string, fullName: string, businessInfo: {ABN: string}}} BusinessUser subset of user for public access
 * @param {number} sellerId a user with businessInfo
 * @returns {BusinessUser} businessUser belonging to sellerIds
 */
export const useBusinessUserAtomFamily = (sellerId) => {
    sellerId = String(sellerId);
    const sellerInfo = useRecoilValue(businessUsersAtomFamily(sellerId));
    return sellerInfo;
};

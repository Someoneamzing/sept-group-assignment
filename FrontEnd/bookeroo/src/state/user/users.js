import axios from 'axios';
import {useEffect} from 'react';
import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
} from 'recoil';

const fetchUser = async (userId) => {
    const config = {
        config: 'GET',
        url: `http://localhost:8081/api/users/${userId}`,
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

export const userAtomFamily = atomFamily({
    key: 'users_info_v1',
    default: selectorFamily({
        key: 'users_info_v1/default',
        get: (userId) => async () => {
            const user = await fetchUser(userId);
            return user;
        },
    }),
});

const fetchAllUsers = async () => {
    const config = {
        config: 'GET',
        url: 'http://localhost:8081/api/users/',
        headers: {
            'Content-Type': 'application-json',
        },
    };
    try {
        const res = await axios(config);
        return res.data._embedded.users;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const allUserIdsAtom = atom({
    key: 'allUsersIdsAtom_v1',
    default: [],
});

export function useAllBooksQuery() {
    const allUsers = useRecoilValue(allUserIdsAtom);
    const loadUsers = useRecoilCallback(({set}) => async () => {
        const allUsers = await fetchAllUsers();
        if (allUsers == null) return;
        const allUserIds = [];
        for (const user of allUsers) {
            const userId = user._links.self.href.split('/').pop();
            allUserIds.push(userId);
            set(userAtomFamily(userId), user);
        }
        set(allUserIdsAtom, allUserIds);
    });
    // (refetches books each time calling component is newly mounted)
    useEffect(() => {
        loadUsers();
    }, [loadUsers]);
    return {allUsers, loadUsers};
}

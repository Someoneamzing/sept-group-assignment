import axios from 'axios';
import {useEffect} from 'react';
import {userAtom} from '../../state/user/authentication';
import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
} from 'recoil';

const fetchUser = async (userId, token) => {
    const config = {
        config: 'GET',
        url: `http://localhost:8080/api/users/${userId}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    };
    try {
        const res = await axios(config);
        return res.data;
    } catch (e) {
        return null;
    }
};

const fetchCurrentUser = async (token) => {
    const config = {
        config: 'GET',
        url: `http://localhost:8080/api/users/userProfile`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
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
        get: (userId) => async ({get}) => {
            try {
                const user = await fetchUser(userId, get(userAtom).token);
                return user;
            } catch (e) {
                return null;
            }        
        },
    }),
});

export const currentUserAtomFamily = atomFamily({
    key: 'users_info_current',
    default: selectorFamily({
        key: 'users_info_current/default',
        get: () => async ({get}) => {
			try {
				const user = await fetchCurrentUser(get(userAtom).token);
				return user;
			} catch (e) {
				return null;
			}        
        },
    }),
});

const fetchAllUsers = async (token) => {
    const config = {
        config: 'GET',
        url: 'http://localhost:8080/api/users/',
        headers: {
            'Content-Type': 'application-json',
            'Authorization': token,
        },
    };
    try {
        const res = await axios(config);
        return res.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const allUserIdsAtom = atom({
    key: 'allUsersIdsAtom_v1',
    default: [],
});

export function useAllUsersQuery() {
    const allUsers = useRecoilValue(allUserIdsAtom);
    const loadUsers = useRecoilCallback(({set, snapshot}) => async () => {
		try {
			const user = await snapshot.getPromise(userAtom);
			const allUsers = await fetchAllUsers(user.token);
			const allUserIds = [];
			for (const user of allUsers) {
				const userId = user.id;
				allUserIds.push(userId);
				set(userAtomFamily(userId), user);
			}
			set(allUserIdsAtom, allUserIds);
		} catch (e) {
			return null;
		}
			
    }, []);
    // (refetches users each time calling component is newly mounted)
	useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    return {allUsers, loadUsers};
}
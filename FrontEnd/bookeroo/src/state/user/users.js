import axios from 'axios';
import {useEffect} from 'react';
import {userAtom} from '../../state/user/authentication';
import {
    atom,
    atomFamily,
    selectorFamily,
    selector,
    useRecoilCallback,
    useRecoilValue,
    useRecoilState,
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

export const PutUserApi = async (data) => {
    // if (!endpoint) throw Error('endpoint not supplied');
    // const user = useRecoilValue(userAtom);
   
    try {
        const token = await userAtom.token;
        // const token = selector({
        //     key: 'users_info_v1/default',
        //     get: () => async ({get}) => {
        //         try {
        //             return axios( { method: 'put',data, url: 'http://localhost:8080/api/users/userProfile', headers: { 'Authorization': 'Bearer ' + await get(userAtom).token } })
        //         } catch (e) {
        //             return null;
        //         }        
        //     },
        // });

        const config = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        };       
        const res = await axios.put(`http://localhost:8080/api/users/userProfile`, data, config);
        return res.data
    } catch (e) {
        if (e.response) {
            throw e.response.data;
        } else {
            // eslint-disable-next-line no-throw-literal
            throw {message: 'Could not connect to auth service'};
        }
    }
}

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
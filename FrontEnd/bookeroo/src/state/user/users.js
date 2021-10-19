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
    useSetRecoilState,
} from 'recoil';

const fetchUser = async (userId, token) => {
    var config = null;

    if(userId === null) {
        config = {
            config: 'GET',
            url: `http://localhost:8080/api/users/userProfile`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        };
    } else {
        debugger
        config = {
            config: 'GET',
            url: `http://localhost:8080/api/users/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        };
    }
    
    try {
        const res = await axios(config);
        return res.data;
    } catch (e) {
        return null;
    }
};

// const fetchCurrentUser = async (token) => {
//     const config = {
//         config: 'GET',
//         url: `http://localhost:8080/api/users/userProfile`,
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': token,
//         },
//     };
//     try {
//         const res = await axios(config);
//         return res.data;
//     } catch (e) {
//         return null;
//     }
// };

export const putUserApi = async (userId, data, token) => {
    // if (!endpoint) throw Error('endpoint not supplied');
    // const user = useRecoilValue(userAtom);
    
    var config = null;
    try {
        // const token = await userAtom.token;
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
       
        config = {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': token,
            },
        };       
        const res = await axios.put(`http://localhost:8080/api/users/${userId}`, data, config);
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

const userCacheKeyAtom = atom({
    key: 'userCache_v1',
    default: 1,
});

const userSelectorFamily = selectorFamily({
    key: 'user_info_v1',
    get:
        ({userId}) =>
        async ({get}) => {
            const user = await fetchUser(userId, get(userAtom).token);
            // delete user.authorities;
            return user;
        },
});

export function useUser(userId) {
    const cacheKey = useRecoilValue(userCacheKeyAtom);
    const user = useRecoilValue(
        userSelectorFamily({userId, cacheKey})
    );
    return user;
}

export function useRefreshUser() {
    const setToken = useSetRecoilState(userCacheKeyAtom);
    return () => {
        setToken((n) => n + 1);
    };
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

// export const currentUserAtomFamily = selectorFamily({
//         key: 'users_info_current/default',
//         get: () => async ({get}) => {
// 			try {
// 				const user = await fetchCurrentUser(get(userAtom).token);
// 				return user;
// 			} catch (e) {
// 				return null;
// 			}        
//         },
//     }),
// });

export const fetchAllUsers = async (token) => {
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

const allUsersAtom = atom({
    key: 'allUsersAtom_v1',
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

export function useAllUsersQueryDetails() {
    const allUsers = useRecoilValue(allUsersAtom);
    const loadUsers = useRecoilCallback(({set, snapshot}) => async () => {
		try {
			const user = await snapshot.getPromise(userAtom);
			const allUsers = await fetchAllUsers(user.token);
			
			set(allUsersAtom, allUsers);
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
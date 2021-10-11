import axios from 'axios';
import {atom, selectorFamily, useRecoilValue, useSetRecoilState} from 'recoil';
import {userAtom} from '../user/authentication';

export const fetchOrderItems = async ({orderId, token}) => {
    const config = {
        config: 'GET',
        url: `http://localhost:8082/api/orders/${orderId}/items`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    };
    try {
        const res = await axios(config);
        return res.data._embedded.orderItems;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const orderItemCacheKeyAtom = atom({
    key: 'orderItemCache_v1',
    default: 1,
});

const orderItemsSelectorFamily = selectorFamily({
    key: 'orderItems_info_v1',
    get:
        ({orderId}) =>
        async ({get}) => {
            return fetchOrderItems({orderId, token: get(userAtom).token});
        },
});

export function useOrderItems(orderId) {
    const cacheKey = useRecoilValue(orderItemCacheKeyAtom);
    const orderItem = useRecoilValue(
        orderItemsSelectorFamily({orderId, cacheKey})
    );
    return orderItem;
}

export function useRefreshOrderItems() {
    const setToken = useSetRecoilState(orderItemCacheKeyAtom);
    return () => {
        setToken((n) => n + 1);
    };
}

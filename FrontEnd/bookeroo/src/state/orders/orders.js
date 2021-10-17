import axios from 'axios';
import {useEffect} from 'react';
import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
} from 'recoil';
import {userAtom} from '../user/authentication';

const fetchOrder = async ({orderId, token}) => {
    const config = {
        config: 'GET',
        url: `http://localhost:8082/api/orders/${orderId}`,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    };
    try {
        const res = await axios(config);
        return res.data;
    } catch (e) {
        return null;
    }
};

const fetchAllOrders = async ({token}) => {
    const config = {
        config: 'GET',
        url: 'http://localhost:8082/api/orders/',
        headers: {
            'Content-Type': 'application/json',
            Authorization: token,
        },
    };
    try {
        const res = await axios(config);
        return res.data._embedded.orders;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const orderAtomFamily = atomFamily({
    key: 'orders_info_v1',
    default: selectorFamily({
        key: 'orders_info_v1/default',
        get:
            (orderId) =>
            async ({get}) =>
                await fetchOrder({orderId, token: get(userAtom).token}),
    }),
});

const allOrderIdsAtom = atom({
    key: 'allOrderIdsAtom_v1',
    default: [],
});

export function useAllOrdersQuery() {
    const allOrders = useRecoilValue(allOrderIdsAtom);
    const loadOrders = useRecoilCallback(
        ({set, snapshot}) =>
            async () => {
                const user = await snapshot.getPromise(userAtom);
                const allOrders = await fetchAllOrders({
                    token: user.token,
                });
                if (allOrders == null) return;
                const allOrderIds = [];
                for (const order of allOrders) {
                    const orderId = order.id;
                    allOrderIds.push(orderId);
                    set(orderAtomFamily(orderId), order);
                }
                set(allOrderIdsAtom, allOrderIds);
            },
        []
    );
    useEffect(() => {
        loadOrders();
    }, [loadOrders]);
    return {allOrders, loadOrders};
}

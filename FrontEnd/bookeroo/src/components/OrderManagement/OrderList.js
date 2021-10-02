import React from 'react';
import List from '@material-ui/core/List';

import {useAllOrdersQuery} from '../../state/orders/orders';
import OrderListItem from './OrderListItem';

export default function OrderList() {
    const {allOrders} = useAllOrdersQuery();
    console.log(allOrders);
    return (
        <List>
            {allOrders.map((orderId) => (
                <OrderListItem key={orderId} orderId={orderId} />
            ))}
        </List>
    );
}

import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import {useRecoilValue} from 'recoil';
import {orderAtomFamily} from '../../state/orders/orders';

export default function OrderListItem({orderId}) {
    const order = useRecoilValue(orderAtomFamily(orderId));
    return (
        <ListItem
            button
            component={Link}
            to={`/orders/${orderId}`}
            key={orderId}
        >
            <ListItemText
                secondary={
                    <>
                        <Typography variant="overline">STATUS:</Typography>
                        <Chip
                            variant="default"
                            color="primary"
                            label={order.status}
                        />
                    </>
                }
            >
                Order from
                {new Date(order.createAt).toLocaleDateString()}
            </ListItemText>
        </ListItem>
    );
}

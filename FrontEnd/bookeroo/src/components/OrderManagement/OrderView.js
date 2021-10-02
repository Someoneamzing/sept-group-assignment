import React, {Suspense} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';
import OrderItemList from './OrderItemList';
import {useOrderItems} from '../../state/orders/orderItems';
import {useRecoilValue} from 'recoil';
import {orderAtomFamily} from '../../state/orders/orders';
import {useParams} from 'react-router';

const statusColours = {};

export default function OrderView({...props}) {
    return (
        <Suspense fallback={<CircularProgress />}>
            <OrderViewContent {...props}></OrderViewContent>
        </Suspense>
    );
}

function OrderViewContent({...props}) {
    const {orderId} = useParams();
    const order = useRecoilValue(orderAtomFamily(orderId));
    const orderItems = useOrderItems(orderId);
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <OrderItemList items={orderItems} />
                </Grid>
                <Grid item xs={4}>
                    <Typography variant="h2">Order</Typography>
                    <Typography variant="overline">Status:</Typography>
                    <Chip variant="default" color="primary">
                        {order.status}
                    </Chip>
                </Grid>
            </Grid>
        </Box>
    );
}

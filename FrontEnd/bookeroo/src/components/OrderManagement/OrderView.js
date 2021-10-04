import React, {Suspense, useState} from 'react';
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
    const [selected, setSelected] = useState([]);
    const order = useRecoilValue(orderAtomFamily(orderId));
    const orderItems = useOrderItems(orderId);
    return (
        <Box>
            <Grid container spacing={2} justifyContent="flex-start">
                <Grid item md={8} xs={12}>
                    <OrderItemList
                        items={orderItems}
                        selected={selected}
                        onChange={setSelected}
                    />
                </Grid>
                <Grid item md={4} xs={12}>
                    <Typography variant="h3">Order</Typography>
                    <Typography variant="overline">Status:</Typography>
                    <Chip
                        variant="default"
                        color="primary"
                        size="small"
                        label={order.status}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

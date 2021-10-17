import {rest} from 'msw';
import {ORDERS, ORDER_ITEMS} from './api.order';

const EP = 'http://localhost:8082/api';

// based on https://testing-library.com/docs/react-testing-library/example-intro/

const handlers = [
    rest.get(EP + '/orders/:orderId/items', (req, res, ctx) => {
        try {
            const result = res(ctx.json(ORDER_ITEMS));
            return result;
        } catch (e) {
            console.log(e);
        }
    }),
    rest.get(EP + '/orders/:orderId', (req, res, ctx) => {
        try {
            const result = res(
                ctx.json(
                    ORDERS._embedded.orders.find(
                        (order) => order.id + '' === req.params.orderId + ''
                    )
                )
            );
            return result;
        } catch (e) {
            console.log(e);
        }
    }),
    rest.get(EP + '/orders', (req, res, ctx) => {
        try {
            const result = res(ctx.json(ORDERS));
            return result;
        } catch (e) {
            console.log(e);
        }
    }),
];

export default handlers;

export const ORDERS = {
    _embedded: {
        orders: [
            {
                id: 3,
                createAt: '2021-09-22T04:25:21.093+00:00',
                updateAt: '2021-09-22T04:25:21.093+00:00',
                deleted: false,
                userId: 1,
                status: 'CURRENT',
                _links: {
                    self: {
                        href: 'http://localhost:8082/api/orders/3',
                    },
                    order: {
                        href: 'http://localhost:8082/api/orders/3',
                    },
                    items: {
                        href: 'http://localhost:8082/api/orders/3/items',
                    },
                },
            },
        ],
    },
    _links: {
        self: {
            href: 'http://localhost:8082/api/orders/',
        },
        profile: {
            href: 'http://localhost:8082/api/profile/orders',
        },
        search: {
            href: 'http://localhost:8082/api/orders/search',
        },
    },
};

export const ORDER_ITEMS = {
    _embedded: {
        orderItems: [
            {
                id: 2,
                createAt: '2021-09-22T04:28:30.912+00:00',
                updateAt: '2021-09-22T04:28:30.912+00:00',
                deleted: false,
                bookForSaleId: 1,
                quantity: 2,
                costInCents: 10000,
                orderId: 3,
                _links: {
                    self: {
                        href: 'http://localhost:8082/api/orderItems/2',
                    },
                    orderItem: {
                        href: 'http://localhost:8082/api/orderItems/2',
                    },
                    order: {
                        href: 'http://localhost:8082/api/orderItems/2/order',
                    },
                },
            },
            {
                id: 3,
                createAt: '2021-10-12T08:51:57.635+00:00',
                updateAt: '2021-10-12T08:51:57.635+00:00',
                deleted: false,
                bookForSaleId: 11,
                quantity: 1,
                costInCents: 16997,
                orderId: 3,
                _links: {
                    self: {
                        href: 'http://localhost:8082/api/orderItems/3',
                    },
                    orderItem: {
                        href: 'http://localhost:8082/api/orderItems/3',
                    },
                    order: {
                        href: 'http://localhost:8082/api/orderItems/3/order',
                    },
                },
            },
        ],
    },
    _links: {
        self: {
            href: 'http://localhost:8082/api/orders/3/items',
        },
    },
};

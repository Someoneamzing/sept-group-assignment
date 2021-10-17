import React from 'react';
import {
    findAllByText,
    findByText,
    fireEvent,
    getByText,
    queryByAttribute,
    queryByText,
    render,
    screen,
    waitFor,
} from '@testing-library/react';
import {Switch, Route} from 'react-router-dom';
import MockRoot from '../testing_utils/MockRoot';
import OrderView from '../components/OrderManagement/OrderView';
import {createMemoryHistory} from 'history';
import {act} from 'react-dom/test-utils';

import '../testing_utils/mockServer';
// import '../testing_utils/books_microservice/mockServer';
import MockState from '../testing_utils/MockState';
import {userAtom} from '../state/user/authentication';
import {ORDER_ITEMS} from '../testing_utils/order_microservice/api.order';

const MOCK_USER = {
    authorities: ['PUBLIC'],
    success: true,
    token: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJmdWxsTmFtZSI6InRlc3RAdGVzdC5jb20iLCJpZCI6IjEiLCJleHAiOjE2MzQzMjk5MjYsImlhdCI6MTYzNDExMzkyNiwidXNlcm5hbWUiOiJ0ZXN0QHRlc3QuY29tIn0.BddlZcIYJ8FjyAHejFQVZYnzgWNHZutoVOnvFzEZniCzewwdZAMB3m3Cni8MElPAylwADgL5rScZFZLv9MKVaQ',
    username: 'test@test.com',
};

describe('OrderView()', () => {
    beforeEach(async () => {
        const history = createMemoryHistory();
        console.dir(userAtom);
        await act(async () => {
            render(
                <MockRoot history={history}>
                    <MockState atom={userAtom} value={MOCK_USER}>
                        <Switch>
                            <Route path="/orders/:orderId">
                                <OrderView />
                            </Route>
                        </Switch>
                    </MockState>
                </MockRoot>
            );
            await Promise.resolve();
            history.push('/orders/3');
            await Promise.resolve();
        });
    });

    // Items should change selected status when clicked
    test('should change selected status when item is clicked', async () => {
        const itemElem = (
            await waitFor(() => screen.getAllByRole('listitem'))
        )[0];
        expect(queryByAttribute('checked', itemElem)).toBeFalsy();
        fireEvent.click(itemElem);
        expect(queryByAttribute('checked', itemElem)).toBeDefined();
    });

    // Should list all order items
    test('should display all of the order items', async () => {
        const items = await waitFor(() => screen.findAllByRole('listitem'));
        for (const item of ORDER_ITEMS._embedded.orderItems) {
            expect(
                items.find((elem) => {
                    return (
                        queryByText(elem, item.quantity) &&
                        queryByText(
                            elem,
                            '$' + (item.costInCents / 100).toFixed(2)
                        )
                    );
                })
            ).toBeDefined();
        }
    });

    test('should display status of the current order', async () => {
        const statusText = await waitFor(() => screen.getByText('CURRENT'));
        expect(statusText).toBeDefined();
    });
});

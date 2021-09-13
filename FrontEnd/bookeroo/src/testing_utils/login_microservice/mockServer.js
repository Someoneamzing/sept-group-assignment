import deepEqual from 'deep-equal';
import {rest} from 'msw';
import {setupServer} from 'msw/node';
import POST_API_LOGIN from './api.login';

const EP = 'http://localhost:8080/api';

// based on https://testing-library.com/docs/react-testing-library/example-intro/

const BookMsServer = setupServer(
    rest.post(EP + '/users/login', (req, res, ctx) => {
        console.log(req.body);
        const badRes = {};
        if (!req.body.username) {
            badRes.username = 'Username cannot be blank';
        }
        if (!req.body.password) {
            badRes.password = 'Password cannot be blank';
        }
        if (Object.keys(badRes).length) {
            return res(ctx.status(400), ctx.json(badRes));
        }
        const {REQ, RES} = POST_API_LOGIN[req.body.username];
        if (REQ) {
            if (deepEqual(req.body, REQ, {strict: true}))
                return res(ctx.json(RES));
        }
        return res(ctx.status(401), ctx.json(POST_API_LOGIN['BAD']));
    })
);

beforeAll(() => BookMsServer.listen());
afterEach(() => BookMsServer.resetHandlers());
afterAll(() => BookMsServer.close());

export default BookMsServer;

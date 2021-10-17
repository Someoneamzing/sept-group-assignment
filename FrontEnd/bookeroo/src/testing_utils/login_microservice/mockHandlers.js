import deepEqual from 'deep-equal';
import {rest} from 'msw';
import POST_API_LOGIN from './api.login';

const EP = 'http://localhost:8080/api';

// based on https://testing-library.com/docs/react-testing-library/example-intro/

const handlers = [
    rest.post(EP + '/users/login', (req, res, ctx) => {
        try {
            const badRes = {};
            let result;
            if (!req.body.username) {
                badRes.username = 'Username cannot be blank';
            }
            if (!req.body.password) {
                badRes.password = 'Password cannot be blank';
            }
            if (Object.keys(badRes).length) {
                result = res(ctx.status(400), ctx.json(badRes));
            }
            if (!result) {
                const user = POST_API_LOGIN[req.body.username];
                if (user) {
                    const {REQ, RES} = POST_API_LOGIN[req.body.username];
                    if (deepEqual(req.body, REQ, {strict: true})) {
                        result = res(ctx.json(RES));
                    }
                }
            }
            if (!result) {
                result = res(
                    ctx.status(401),
                    ctx.json({message: 'Bad credentials'})
                );
            }
            return result;
        } catch (e) {
            console.log(e);
        }
    }),
];

export default handlers;

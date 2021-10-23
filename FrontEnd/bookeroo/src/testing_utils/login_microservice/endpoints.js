import deepEqual from 'deep-equal';
import {rest} from 'msw';
import POST_API_LOGIN from './api.login';
import GET_API_LOGIN_SEARCH_FINDALLBYIDIN from './api.search.findAllByIdIn';

const EP = 'http://localhost:8080/api';
const endpoints = [
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
    rest.get(EP + '/users/search/findAllByIdIn*', (req, res, ctx) => {
        const id = req.url.searchParams.get('id');
        const data = GET_API_LOGIN_SEARCH_FINDALLBYIDIN[id];
        if (data) {
            return res(ctx.json(data));
        }
        return res(ctx.status(404, 'not found'));
    }),
];

export default endpoints;

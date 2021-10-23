import {rest} from 'msw';
import {setupServer} from 'msw/node';
import GET_API_BOOKS_RES from './api.books';

const EP = 'http://localhost:8081/api';

// based on https://testing-library.com/docs/react-testing-library/example-intro/

const BookMsServer = setupServer(
    rest.get(EP + '/books/', (req, res, ctx) => {
        return res(ctx.json(GET_API_BOOKS_RES));
    }),
    rest.get(EP + '/books/:bookId', (req, res, ctx) => {
        const index = req.params.bookId;
        const data = GET_API_BOOKS_RES._embedded.books[index];
        if (data) {
            return res(ctx.json(data));
        } else {
            return res(ctx.status(404, 'not found'));
        }
    })
);

beforeAll(() => BookMsServer.listen());
afterEach(() => BookMsServer.resetHandlers());
afterAll(() => BookMsServer.close());

export default BookMsServer;

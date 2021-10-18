import {rest} from 'msw';
import {setupServer} from 'msw/node';
import GET_API_BOOKS_RES, {
    GET_API_BOOKS_SEARCH_FIND_ALL_BY_BOOK_ID,
} from './api.books';

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
        }
        return res(ctx.status(404, 'not found'));
    }),
    rest.get(EP + '/bookForSales/search/findAllByBook_Id*', (req, res, ctx) => {
        const id = req.url.searchParams.get('bookId');
        const data = GET_API_BOOKS_SEARCH_FIND_ALL_BY_BOOK_ID[Number(id)];
        if (data) {
            console.log(id, data._embedded.bookForSales.length);
            return res(ctx.json(data));
        }
        return res(ctx.status(404, 'not found'));
    })
);

beforeAll(() => BookMsServer.listen());
afterEach(() => BookMsServer.resetHandlers());
afterAll(() => BookMsServer.close());

export default BookMsServer;

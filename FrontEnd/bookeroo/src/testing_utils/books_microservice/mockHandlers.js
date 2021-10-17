import {rest} from 'msw';
import {GET_API_BOOKS_RES, GET_BOOK_FOR_SALES_RES} from './api.books';

const EP = 'http://localhost:8081/api';

// based on https://testing-library.com/docs/react-testing-library/example-intro/

const handlers = [
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
    }),
    rest.get(EP + '/bookForSales/:bookForSaleId', (req, res, ctx) => {
        const index = req.params.bookForSaleId;
        const data = GET_BOOK_FOR_SALES_RES._embedded.bookForSales.find(
            (bfs) => bfs.id + '' === index + ''
        );
        if (data) {
            return res(ctx.json(data));
        } else {
            return res(ctx.status(404, 'not found'));
        }
    }),
];

export default handlers;

import {rest} from 'msw';
import GET_API_BOOKS_RES, {
    GET_API_BOOKS_SEARCH_FIND_ALL_BY_BOOK_ID,
    FILTER_PAGE,
    HORROR_BOOKS,
} from './api.books';
const EP = 'http://localhost:8081/api';

const endpoints = [
    rest.get(EP + '/books/', (req, res, ctx) => {
        return res(ctx.json(GET_API_BOOKS_RES));
    }),
    rest.get(EP + '/books/filter', (req, res, ctx) => {
        const query = req.url.searchParams;
        const genre = query.get('genre');

        // mock repsonse for different genres
        if (genre === 'all') {
            return res(ctx.json(FILTER_PAGE));
        } else if (genre === 'Horror') {
            return res(ctx.json(HORROR_BOOKS));
        }
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
            return res(ctx.json(data));
        }
        return res(ctx.status(404, 'not found'));
    }),
];

export default endpoints;

import axios from 'axios';
import {atomFamily, selectorFamily} from 'recoil';

function later(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

const PLACEHOLDER_BOOK = {
    id: '234',
    title: 'The Curious Incident of the Dog in the Night-Time',
    author: 'Bob Bobson',
    publisher: 'sdfsdfsdf',
    isbn: 25298452,
    date_published: Date.now() / 1000,
    rating: 0.75,
    price: 10.99,
    cover_img: '/bookbook.png',
};

const fetchBook = async (bookId) => {
    const config = {
        config: 'GET',
        url: `http://localhost:8081/api/books/${bookId}`,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    try {
        const res = await axios(config);
        return res.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const bookAtomFamily = atomFamily({
    key: 'books_info_v1',
    default: selectorFamily({
        key: 'books_info_v1/default',
        get: (bookId) => async () => {
            const book = await fetchBook(bookId);
            return book;
        },
    }),
});

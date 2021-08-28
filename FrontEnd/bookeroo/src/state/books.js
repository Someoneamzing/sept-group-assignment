import {atomFamily, selectorFamily} from 'recoil';

function later(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

const PlACEHOLDER_BOOK = {
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
    await later(2000);
    return PlACEHOLDER_BOOK;
};

export const bookAtomFamily = atomFamily({
    key: 'books_info_v1',
    default: selectorFamily({
        key: 'books_info_v1/default',
        get:
            (bookId) =>
            async ({}) => {
                const book = await fetchBook(bookId);
                return book;
            },
    }),
});

import axios from 'axios';
import {useCallback, useEffect} from 'react';
import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
} from 'recoil';

function later(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

const PLACEHOLDER_BOOK = {
    id: '234',
    bookTitle: 'The Curious Incident of the Dog in the Night-Time',
    author: 'Bob Bobson',
    publisher: 'sdfsdfsdf',
    isbn: 25298452,
    publishDate: Date.now() / 1000,
    priceInCents: 1099,
    coverArtURL: '/bookbook.png',
    tableOfContents: 'chapter 1\nchapter 2\nchapter 3',
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

const fetchAllBooks = async () => {
    const config = {
        config: 'GET',
        url: 'http://localhost:8081/api/books/',
        headers: {
            'Content-Type': 'application-json',
        },
    };
    try {
        const res = await axios(config);
        return res.data._embedded.books;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const allBookIdsAtom = atom({
    key: 'allBooksIdsAtom_v1',
    default: [],
});

export function useAllBooksQuery() {
    const allBooks = useRecoilValue(allBookIdsAtom);
    const loadBooks = useRecoilCallback(({set}) => async () => {
        const allBooks = await fetchAllBooks();
        const allBookIds = [];
        for (const book of allBooks) {
            const bookId = book._links.self.href.split('/').pop();
            allBookIds.push(bookId);
            set(bookAtomFamily(bookId), book);
        }
        set(allBookIdsAtom, allBookIds);
    });
    useEffect(() => {
        loadBooks();
    }, []);
    return {allBooks, loadBooks};
}

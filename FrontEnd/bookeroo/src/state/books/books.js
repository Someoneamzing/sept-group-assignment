import axios from 'axios';
import {useEffect} from 'react';
import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
} from 'recoil';
import {BOOK_MS_ENDPOINT} from '../../env-vars';

const fetchBook = async (bookId) => {
    const config = {
        config: 'GET',
        url: `http://${BOOK_MS_ENDPOINT}/api/books/${bookId}`,
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
        url: `http://${BOOK_MS_ENDPOINT}/api/books/`,
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
    const loadBooks = useRecoilCallback(
        ({set}) =>
            async () => {
                const allBooks = await fetchAllBooks();
                if (allBooks == null) return;
                const allBookIds = [];
                for (const book of allBooks) {
                    const bookId = book._links.self.href.split('/').pop();
                    allBookIds.push(bookId);
                    set(bookAtomFamily(bookId), book);
                }
                set(allBookIdsAtom, allBookIds);
            },
        []
    );
    // (refetches books each time calling component is newly mounted)
    useEffect(() => {
        loadBooks();
    }, [loadBooks]);
    return {allBooks, loadBooks};
}

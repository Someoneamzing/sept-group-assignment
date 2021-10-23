import {useEffect, useState} from 'react';
import BOOK_AXIOS_INSTANCE from './BookAxiosInstance';

import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
} from 'recoil';

import {getAllBooks} from '../../api';

const fetchBook = async (bookId) => {
    try {
        const res = await BOOK_AXIOS_INSTANCE.get(`/api/books/${bookId}`);
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

// const fetchAllBooks = async () => {
//     try {
//         const res = await BOOK_AXIOS_INSTANCE.get('/api/books/');
//         return res.data._embedded.books;
//     } catch (e) {
//         console.log(e);
//         return null;
//     }
// };

const fetchFilteredBooks = async (genre) => {
    try {
        const res = await BOOK_AXIOS_INSTANCE.get(`/api/books/filter`, {
            params: {
                genre: `${genre}`,
            },
        });
        return [res.data['Genres'], res.data['Books']];
    } catch (e) {
        console.log(e);
        return null;
    }
};

const allBookIdsAtom = atom({
    key: 'allBooksIdsAtom_v1',
    default: [],
});

export const useAllBooksQuery = (onLoad = true) => {
    const [loaded, setLoaded] = useState(false);
    const allBooks = useRecoilValue(allBookIdsAtom);
    const loadBooks = useRecoilCallback(
        ({set}) =>
            async () => {
                const allBooks = await getAllBooks({sort: false});
                if (allBooks == null) return;
                const allBookIds = [];
                for (const book of allBooks) {
                    // VERY IMPORTANT THAT ALL KEYS ARE STRINGS NOT NUMBERS - numbers will not hit same entries as strings
                    const bookId = String(book.id);
                    allBookIds.push(bookId);
                    set(bookAtomFamily(bookId), book);
                }
                set(allBookIdsAtom, allBookIds);
            },
        []
    );
    // onLoad refetches books each time calling component is newly mounted and optionally if no data loaded
    useEffect(() => {
        if ((!allBooks.length || onLoad) && !loaded) {
            loadBooks();
            setLoaded(true);
        }
    }, [allBooks.length, loaded, loadBooks, onLoad]);
    return {allBooks, loadBooks};
};

/**
 * @typedef {{string}} Date a date string in ISO format i.e new Date(str)
 * @typedef {{createAt: Date, updateAt: Date, id: number, deleted: boolean, bookTitle: string, author: string, publisher: string, publishDate: Date, coverArtURL: URL, tableOfContents: string, isbn: string, genre: string}} Book
 * @param {number} bookId
 * @returns {Book}
 * @returns {null}
 * @throws {Error} Error if bookId is not a number
 */
export function useBookAtomFamily(bookId) {
    bookId = String(bookId);
    const data = useRecoilValue(bookAtomFamily(bookId));
    return data;
}

export function useFilterPageQuery(genre) {
    const allBooks = useRecoilValue(allBookIdsAtom);
    const [genres, setGenres] = useState([]);
    const loadBooks = useRecoilCallback(
        ({set}) =>
            async () => {
                const allBooksInfo = await fetchFilteredBooks(genre);

                if (allBooksInfo == null) return;

                setGenres(allBooksInfo[0]);

                const allBookIds = [];
                for (const book of allBooksInfo[1]) {
                    const bookId = book['id'];
                    allBookIds.push(bookId);
                    set(bookAtomFamily(bookId), book);
                }
                set(allBookIdsAtom, allBookIds);
            },
        [genre]
    );
    // (refetches books when genre is changed)
    useEffect(() => {
        loadBooks();
    }, [loadBooks]);
    return {allBooks, loadBooks, genres};
}

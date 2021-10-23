import {useEffect, useState} from 'react';
import BOOK_AXIOS_INSTANCE from './BookAxiosInstance';
import {
    atom,
    atomFamily,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
} from 'recoil';

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

const fetchAllBooks = async () => {
    try {
        const res = await BOOK_AXIOS_INSTANCE.get('/api/books/');
        return res.data._embedded.books;
    } catch (e) {
        console.log(e);
        return null;
    }
};

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

export function FilterPageQuery(genre) {
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

import axios from 'axios';
import {useEffect, useState} from 'react';
import {
    atom,
    atomFamily,
    selector,
    selectorFamily,
    useRecoilCallback,
    useRecoilValue,
} from 'recoil';
import {getBookForSalesSearchBookId} from '../../api';
import {BOOK_MS_ENDPOINT} from '../../env-vars';

const fetchBookForSale = async (bookId) => {
    const config = {
        config: 'GET',
        url: `http://${BOOK_MS_ENDPOINT}/api/bookForSales/${bookId}`,
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

// const fetchAllBookForSales = async () => {
//     const config = {
//         config: 'GET',
//         url: `http://${BOOK_MS_ENDPOINT}/api/bookForSales/`,
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     };
//     try {
//         const res = await axios(config);
//         return res.data._embedded.bookForSales;
//     } catch (e) {
//         console.log(e);
//         return null;
//     }
// };

const allBookForSaleIdsAtom = atom({
    key: 'allBookForSaleIdsAtom_v1',
    default: [],
});

export const bookForSaleAtomFamily = atomFamily({
    key: 'bookForSaleAtomFamily',
    default: selectorFamily({
        key: 'bookForSaleAtomFamily/default',
        get: (bookId) => async () => {
            const book = await fetchBookForSale(bookId);
            return book;
        },
    }),
});

// a map of BookIds each having a list of bookForSaleIds
const bookForSaleIdsByBookIdsSelector = selector({
    key: 'bookForSaleIdsByMainBook',
    get: ({get}) => {
        const bkMap = {};
        const idList = get(allBookForSaleIdsAtom);
        for (let id of idList) {
            const bs = get(bookForSaleAtomFamily(id));
            if (!bkMap[bs.bookId]) bkMap[bs.bookId] = [];
            bkMap[bs.bookId].push(bs.id);
        }
        return bkMap;
    },
});

const bookForSalesForBookIdSelector = selectorFamily({
    key: 'bookForSalesForBookIdSelector',
    get:
        (bookId) =>
        ({get}) => {
            return get(bookForSaleIdsByBookIdsSelector)[bookId];
        },
});

/**
 *
 * @param {number} bookId id of book to get list of bookForSale ids for
 * @returns a list of bookForSale ids, empty list returned if no list exists
 */
export const useBookIdForBookForSaleIds = (bookId, callback) => {
    bookId = String(bookId);
    const res = useRecoilValue(bookForSalesForBookIdSelector(bookId));
    if (!res) {
        return [];
    }
    return res;
};

export const useBookForSalesByBookIdQuery = (bookId, onLoad = true) => {
    const [loaded, setLoaded] = useState(false);
    const allBooksFS = useBookIdForBookForSaleIds(bookId);
    const loadBookForSales = useRecoilCallback(
        ({set}) =>
            async () => {
                const allBookFS = await getBookForSalesSearchBookId(bookId);
                if (allBookFS == null) return;
                const allBookFSIds = [];
                for (let bookFS of allBookFS) {
                    const id = String(bookFS.id);
                    allBookFSIds.push(id);
                    set(bookForSaleAtomFamily(id), bookFS);
                }
                set(allBookForSaleIdsAtom, (x) =>
                    Array.from(new Set([...x, ...allBookFSIds]))
                );
            },
        []
    );
    // onLoad refetches books each time calling component is newly mounted, hook will try load if atom is empty
    useEffect(() => {
        if ((!allBooksFS.length || onLoad) && !loaded) {
            loadBookForSales();
            setLoaded(true);
        }
    }, [allBooksFS.length, loaded, onLoad, loadBookForSales]);
    return {loadBookForSales};
};

export const useSearchBookForSalesQuery = (bookId, onLoad = true) => {
    return useBookForSalesByBookIdQuery(bookId, onLoad);
};

/**
 * @typedef {{string}} Date a date string in ISO format i.e new Date(str)
 * @typedef {{createAt: Date, updateAt: Date, id: number, bookId: number, deleted: boolean, sellerId: number, availableStock: number, sellPriceInCents: number}} BookForSale
 * @param {number} bookForSaleId
 * @returns {BookForSale}
 * @returns {null}
 * @throws {Error} Error if bookForSaleId is not a number
 */
export function useBookForSaleAtomFamily(bookForSaleId) {
    bookForSaleId = String(bookForSaleId);
    const data = useRecoilValue(bookForSaleAtomFamily(bookForSaleId));
    return data;
}

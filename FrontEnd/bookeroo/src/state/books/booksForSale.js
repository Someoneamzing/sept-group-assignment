import {atom, selectorFamily, useRecoilValue, useSetRecoilState} from 'recoil';
import BOOK_AXIOS_INSTANCE from './BookAxiosInstance';

const fetchBookForSale = async (bookId) => {
    // const config = {
    //     config: 'GET',
    //     url: `http://${BOOK_MS_ENDPOINT}/api/bookForSales/${bookId}`,
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    // };
    try {
        const res = await BOOK_AXIOS_INSTANCE.get(
            `/api/bookForSales/${bookId}`
        );
        return res.data;
    } catch (e) {
        console.log(e);
        return null;
    }
};

const bookForSaleCacheKeyAtom = atom({
    key: 'bookForSaleCache_v1',
    default: 1,
});

const bookForSaleSelectorFamily = selectorFamily({
    key: 'booksForSale_info_v1',
    get:
        ({bookId}) =>
        async () => {
            const bookForSale = await fetchBookForSale(bookId);
            return bookForSale;
        },
});

export function useBookForSale(bookId) {
    const cacheKey = useRecoilValue(bookForSaleCacheKeyAtom);
    const bookForSale = useRecoilValue(
        bookForSaleSelectorFamily({bookId, cacheKey})
    );
    return bookForSale;
}

export function useRefreshBookForSale() {
    const setToken = useSetRecoilState(bookForSaleCacheKeyAtom);
    return () => {
        setToken((n) => n + 1);
    };
}

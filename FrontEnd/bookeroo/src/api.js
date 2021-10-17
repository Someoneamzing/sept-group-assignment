import axios from 'axios';
import {fetchOrderItems} from './state/orders/orderItems';
import {BOOK_MS_ENDPOINT, ORDER_MS_ENDPOINT} from './env-vars';

const BOOK_PATH = `http://${BOOK_MS_ENDPOINT}`;
const ORDER_PATH = `http://${ORDER_MS_ENDPOINT}`;

/**
 * Makes a request to the API to create a book with the given data.
 * @param {Object} data
 * @returns {Promise<Object>} Promise that resolves with the server's response.
 */
export async function createBook(data) {
    const url = new URL(`/api/books`, BOOK_PATH);
    const response = await axios.post(url, data);
    return response.data;
}

/**
 * Makes a request to the API to create a BookForSale with the given data.
 * @param {Object} data
 * @returns {Promise<Object>} Promise that resolves with the server's response.
 */
export async function createBookForSale(data) {
    data.book = new URL(
        data.book._links?.self?.href ||
            (await createBook(data.book))._links.self.href
    ).pathname;
    const url = new URL(`/api/bookForSales`, BOOK_PATH);
    const response = await axios.post(url, data);
    return response.data;
}

/**
 * Retrieves the list of all books in the system, sorted by title. Resolves pagination
 * @returns The list of all books in the system.
 */
export async function getAllBooks({sort = true} = {}) {
    const url = new URL(`/api/books`, BOOK_PATH);
    url.searchParams.set('size', 100);
    let response = await axios.get(url);
    const result = [...response.data._embedded.books];
    await Promise.all(
        Array.from(
            {length: response.data.page.totalPages - 1},
            async (_, i) => {
                url.searchParams.set('page', i + 1);
                const res = await axios.get(url);
                result.push(...res.data._embedded.books);
            }
        )
    );
    if (!sort) return result;
    return result.sort((a, b) => {
        if (a.bookTitle < b.bookTitle) {
            return -1;
        } else if (a.bookTitle > b.bookTitle) {
            return 1;
        } else return 0;
    });
}

export async function createOrderItem({item, token}) {
    if (typeof item.bookForSaleId !== 'number')
        throw new TypeError(
            `createOrderItem expects item.bookForSaleId to be a number.`
        );
    if (typeof item.quantity !== 'number')
        throw new TypeError(
            `createOrderItem expects item.quantity to be a number.`
        );
    if (typeof item.orderId !== 'number') {
        const url = new URL(`/api/orders/current`, ORDER_PATH);
        item.orderId = (
            await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            })
        ).data.id;
    }
    const orderItems = await fetchOrderItems({
        orderId: item.orderId,
        token,
    });
    const url = new URL(`/api/orderItems`, ORDER_PATH);
    //Check if an item in the order is already for this bookForSale
    const existing = orderItems.find(
        (oItem) => oItem.bookForSaleId === item.bookForSaleId
    );
    if (existing) {
        // If so update it with an increased quantity
        const response = await axios.patch(url, {
            quantity: existing.quantity + item.quantity,
        });
        return response.data;
    } else {
        // Otherwise create a new one
        item.order = new URL(`/api/orders/${item.orderId}`, ORDER_PATH);
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token,
            },
        };
        const response = await axios.post(url, item, config);
        return response.data;
    }
}
/**
 * Retrieves the list of all bookForSales in the system, sorted by title. Resolves pagination
 * @returns The list of all bookForSales in the system.
 */
export async function getAllBookForSales() {
    const url = new URL(`/api/bookForSales`, BOOK_PATH);
    url.searchParams.set('size', 100);
    let response = await axios.get(url);
    const result = [...response.data._embedded.bookForSales];
    await Promise.all(
        Array.from(
            {length: response.data.page.totalPages - 1},
            async (_, i) => {
                url.searchParams.set('page', i + 1);
                const res = await axios.get(url);
                result.push(...res.data._embedded.bookForSales);
            }
        )
    );
    return result;
}

/**
 * Retrieves the list of bookForSales belonging to a specific book by Id
 * @returns the list of bookForSales
 */
export async function getBookForSalesSearchBookId(bookId) {
    const url = new URL(`/api/bookForSales/search/findAllByBook_Id`, BOOK_PATH);
    url.searchParams.set('bookId', bookId);
    let response = await axios.get(url);
    return [...response.data._embedded.bookForSales];
}

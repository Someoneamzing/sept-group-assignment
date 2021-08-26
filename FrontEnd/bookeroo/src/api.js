import axios from 'axios';

export async function createBook(data) {
    const url = new URL(`/api/books`, document.location);
    url.port = 8081;
    const response = await axios.post(url, data);
    return response.data;
}

export async function createBookForSale(data) {
    if (typeof data.book !== 'string') {
        data.book = new URL((await createBook(data.book))._links.self).pathname;
    }
    const url = new URL(`/api/bookForSales`, document.location);
    url.port = 8081;
    const response = await axios.post(url, data);
    return response.data;
}

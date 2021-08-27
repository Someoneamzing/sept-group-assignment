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

export async function getBooks() {
    const url = new URL(`/api/books`, document.location);
    url.port = 8081;
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
    return result.sort((a, b) => {
        if (a.bookTitle < b.bookTitle) {
            return -1;
        } else if (a.bookTitle > b.bookTitle) {
            return 1;
        } else return 0;
    });
}

import TEST_BOOKS from '../testing_utils/books_microservice/api.books';
import '../testing_utils/books_microservice/mockServer';
import {createBook, getAllBooks} from '../api';
import axios from 'axios';
jest.mock('axios', () => {
    const originalAxios = jest.requireActual('axios');
    return {
        __esModule: true,
        ...originalAxios,
        default: {...originalAxios.default, post: jest.fn()},
    };
});

describe('getAllBooks()', () => {
    test('should return the list of books', async () => {
        expect(await getAllBooks({sort: false})).toStrictEqual(
            TEST_BOOKS._embedded.books
        );
    });
});

describe('createBook()', () => {
    const newBookData = {
        bookTitle: 'One Night The Moon',
        author: 'James Humphry',
        publisher: 'Penguin',
        publishDate: '2002-08-07',
        isbn: 'i38756245879',
        coverArtURL: 'data:image/png;base64,iVBORw',
        tableOfContents: 'Chapter1\nChapter2\nChapter3\n',
    };
    const expectedResponse = {
        createAt: '2021-09-06T07:03:22.455+00:00',
        updateAt: '2021-09-06T07:03:22.455+00:00',
        deleted: false,
        bookTitle: 'One Night The Moon',
        author: 'James Humphry',
        publisher: 'Penguin',
        publishDate: '2002-08-07T00:00:00.000+00:00',
        coverArtURL: 'data:image/png;base64,iVBORw',
        tableOfContents: 'Chapter1\nChapter2\nChapter3\n',
        isbn: 'i38756245879',
        _links: {
            self: {
                href: 'http://localhost:8081/api/books/41',
            },
            book: {
                href: 'http://localhost:8081/api/books/41',
            },
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should send the appropriate POST request with valid data', async () => {
        axios.post.mockResolvedValue({data: expectedResponse});
        const result = await createBook(newBookData);
        expect(result).toStrictEqual(expectedResponse);
        expect(axios.post).toHaveBeenCalledWith(
            new URL('http://localhost:8081/api/books'),
            newBookData
        );
    });

    test('should throw error on failed request', async () => {
        axios.post.mockRejectedValue({response: {status: 500}});
        await expect(createBook(newBookData)).rejects.toStrictEqual({
            response: {status: 500},
        });
    });
});

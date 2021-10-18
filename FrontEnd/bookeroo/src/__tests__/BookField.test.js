import React from 'react';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {getAllBooks} from '../api';
import {Formik} from 'formik';
import TEST_BOOKS from '../testing_utils/books_microservice/api.books';
import BookField from '../components/BookManagement/BookField';
import '../testing_utils/books_microservice/mockServer';
process.on('unhandledRejection', (err) => {
    console.error(err);
});

jest.mock('../api', () => {
    const originalAPI = jest.requireActual('../api.js');
    return {
        __esModule: true,
        ...originalAPI,
        getAllBooks: jest.fn(),
    };
});

// TODO: Throwing error that is not present in manual testing. Can't find solution so I'm moving on for now
describe('BookField', () => {
    const promise = Promise.resolve();
    // getAllBooks.mockResolvedValue(TEST_BOOKS);
    test('should display all books when user focuses', async () => {
        getAllBooks.mockResolvedValue(TEST_BOOKS._embedded.books.slice(0, 3));
        await act(async () => {
            render(
                <Formik initialValues={{book: null}}>
                    {(formik) => (
                        <BookField
                            name="book"
                            label="Book"
                            allowCreate={true}
                        />
                    )}
                </Formik>
            );
            await promise;
        });
        await act(async () => {
            fireEvent.focus(screen.getByLabelText('Book'));
            await promise;
        });
        const items = await waitFor(
            () => screen.getAllByText('One Night The Moon'),
            {timeout: 4000}
        );
        expect(items).toHaveLength(1);
    });

    test('should display "Add x" option for search terms that aren\'t found that opens the add book dialog', async () => {
        getAllBooks.mockResolvedValue(TEST_BOOKS._embedded.books.slice(0, 3));
        await act(async () => {
            render(
                <Formik initialValues={{book: null}}>
                    {(formik) => (
                        <BookField
                            name="book"
                            label="Book"
                            allowCreate={true}
                        />
                    )}
                </Formik>
            );
            await promise;
        });
        const input = screen.getByLabelText('Book');
        await act(async () => {
            input.focus();
            await promise;
        });
        act(() => {
            // input.value = 'Test Book 1';
            fireEvent.change(input, {target: {value: 'Test Book 1'}});
        });
        const item = await waitFor(() => screen.getByText('Add Test Book 1'));
        act(() => {
            fireEvent.click(item);
        });
        await waitFor(() => screen.getByTestId('dialog-title'));
    });
});

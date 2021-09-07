import React from 'react';
import {
    act,
    fireEvent,
    render,
    screen,
    cleanup,
    waitFor,
} from '@testing-library/react';

import {getBooks} from '../api';
import {Formik} from 'formik';
import TEST_BOOKS from '../testingUtils/books_microservice/api.books';
import BookField from '../components/BookField';
import '../testingUtils/books_microservice/mockServer';
process.on('unhandledRejection', (err) => {
    console.error(err);
});

jest.mock('../api', () => {
    const originalAPI = jest.requireActual('../api.js');
    return {
        __esModule: true,
        ...originalAPI,
        getBooks: jest.fn(),
    };
});

// TODO: Throwing error that is not present in manual testing. Can't find solution so I'm moving on for now
describe('BookField', () => {
    const promise = Promise.resolve();
    // getBooks.mockResolvedValue(TEST_BOOKS);
    test('should display all books when user focusses', async () => {
        getBooks.mockResolvedValue(TEST_BOOKS._embedded.books.slice(0, 3));
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
        expect(items).toHaveLength(3);
    });
});

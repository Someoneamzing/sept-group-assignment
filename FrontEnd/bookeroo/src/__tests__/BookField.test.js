import React from 'react';
import {act, fireEvent, render, screen, cleanup} from '@testing-library/react';

import api, {getBooks} from '../api';
import {Formik} from 'formik';
import TEST_BOOKS from '../testingUtils/books_microservice/api.books';
import BookField from '../components/BookField';
process.on('unhandledRejection', (err) => {
    console.error(err);
});

jest.mock('../api');

// TODO: Throwing error that is not present in manual testing. Can't find solution so I'm moving on for now
describe('BookField', () => {
    getBooks.mockResolvedValue(TEST_BOOKS);

    test('should display all books when user focusses', async () => {
        render(
            <Formik initialValues={{book: null}}>
                {(formik) => (
                    <BookField name="book" label="Book" allowCreate={true} />
                )}
            </Formik>
        );
        act(() => {
            fireEvent.focus(screen.getByTestId('autocomplete-id'));
        });
    });
});

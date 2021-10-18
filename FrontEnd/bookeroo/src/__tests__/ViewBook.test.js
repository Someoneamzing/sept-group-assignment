import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Root from '../Root';
import MockRoot from '../testing_utils/MockRoot';
import {ViewBookSuspense} from '../components/BookManagement/ViewBook';

// add mock book microservice to testing context
import '../testing_utils/books_microservice/mockServer';
import {createMemoryHistory} from 'history';

/// SEP-10 As a User, I want to be able to see a preview of a book so I can learn more about a book I'm interested in

/*
GIVEN I am viewing a list of books,
WHEN I click on a book,
THEN the system will display a preview of the book’s cover art
*/
test('SEP-10: I want to see the book’s cover art', async () => {
    render(<Root />);
    fireEvent.click(screen.getAllByText('Books')[0]);
    const bookLinks = () => screen.getAllByText('One Night The Moon');
    await waitFor(bookLinks);
    fireEvent.click(bookLinks()[0]);
    const bookImg = () => screen.getByAltText('book cover');
    await waitFor(bookImg);
    expect(bookImg().nodeName).toEqual('IMG');
});

/*
GIVEN I am viewing a book listing 
AND the book has a table of contents
WHEN I click on “Preview Contents“,
THEN the system displays the books table of contents.
*/
test("SEP-10: I want to see a book's table of contents", async () => {
    render(
        <MockRoot>
            <ViewBookSuspense bookId="1" />
        </MockRoot>
    );
    await waitFor(() => screen.getByText('Preview Book'));
    fireEvent.click(screen.getByText('Preview Book'));
    await waitFor(() => screen.getAllByText('Table of Contents:'));
    fireEvent.click(screen.getByText('Done'));
    await waitFor(() => screen.getByText('Preview Book'));
});

/*
GIVEN I navigate to a /book/ based URL referencing a nonexistent book ID
WHEN the component finishes loading
THEN It should say the book is not found (404)
*/
test('SEP-10: I want to see a 404 page if a book does not exist', async () => {
    const history = new createMemoryHistory();
    history.push('/book/3453');
    render(
        <MockRoot history={history}>
            <ViewBookSuspense bookId="3453" />
        </MockRoot>
    );

    await waitFor(() => screen.getByText('404'));
    await waitFor(() => screen.getByText('/book/3453'));
});

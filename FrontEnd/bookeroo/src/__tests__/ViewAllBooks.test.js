import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Root from '../Root';

import '../testing_utils/books_microservice/mockServer';
import GET_API_BOOKS_RES, {
    GET_API_BOOKS_SEARCH_FIND_ALL_BY_BOOK_ID,
} from '../testing_utils/books_microservice/api.books';
import {PAGE_SIZE} from '../components/BookManagement/ViewAllBooks';
import {act} from 'react-dom/test-utils';

function later(delay) {
    return new Promise(function (resolve) {
        setTimeout(resolve, delay);
    });
}

/// SEP-75 As any type of user I want to see the list of books available so I can choose what to buy

/*
GIVEN: I am on the Bookeroo site
WHEN: I click on the Books link
THEN: the books page displays all of the books with the title ‘All Books’
AND: the books page lists up to 5 books at a time
AND: displays the number of total books
AND: the number of pages of books.
AND: for each book I can see the book cover, the title, the author, the year published
AND: For each book a button with the number of stores that sell the book
*/
const wait = () =>
    act(async () => {
        await later(1);
    });
test('SEP-75: Scenario 0: I see the book list items on the All Books Page', async () => {
    render(<Root />);
    fireEvent.click(screen.getAllByText('Books')[0]);
    // THEN: the books page displays all of the books with the title ‘All Books’
    await waitFor(() => screen.getByText('All Books'));
    const books = await waitFor(() => screen.getAllByTestId('booklistitem'));
    // AND: the books page lists up to PAGE_SIZE books at a time
    expect(books.length).toEqual(PAGE_SIZE);
    const bookCount = screen.getByTestId('bookcount').innerHTML;
    const bData = GET_API_BOOKS_RES._embedded.books;
    // AND: displays the number of total books
    expect(bookCount).toEqual(bData.length + ' Books');
    const pageCount = screen.getByTestId('bookpagecount').innerHTML;
    // AND: the number of pages of books.
    expect(pageCount).toEqual(
        `Page 1 of ${Math.ceil(bData.length / PAGE_SIZE)}`
    );
    // AND: for each book I can see the book cover, the title, the author, the year published
    const getBookItemData = () => ({
        cover: screen.getAllByTestId('bookcover'),
        title: screen.getAllByTestId('booktitle'),
        author: screen.getAllByTestId('bookauthor'),
        year: screen.getAllByTestId('bookyear'),
        stores: screen.getAllByTestId('storecount'),
    });
    let nodes = getBookItemData();
    window.scrollTo = jest.fn();
    await wait();
    for (let i = 0; i < bData.length; i++) {
        const {coverArtURL, bookTitle, author, publishDate, id} = bData[i];
        // console.log(i, 'book', id, bookTitle);
        const bfsData =
            GET_API_BOOKS_SEARCH_FIND_ALL_BY_BOOK_ID[id]._embedded.bookForSales;
        const dataYear = publishDate.split('-')[0];
        const pIndex = i % PAGE_SIZE;
        const cover = nodes.cover[pIndex];
        const title = nodes.title[pIndex];
        const nodeAuthor = nodes.author[pIndex];
        const year = nodes.year[pIndex];
        const stores = nodes.stores[pIndex];
        expect(cover.style['background-image']).toContain(coverArtURL);
        expect(title.textContent).toEqual(bookTitle);
        expect(nodeAuthor.textContent).toEqual(author);
        expect(year.textContent).toEqual(dataYear);
        // AND: For each book a button with the number of stores that sell the book
        /* &&
        Scenario 1: I see unavailable books
        GIVEN: I am on the All Books List page
        WHEN: A book has no available stores
        THEN: the store count says ‘Unavailable’
        */
        const storesExpected = bfsData.length
            ? bfsData.length + ' Stores' + bfsData.length === 1
                ? 's'
                : ''
            : 'Unavailable';
        expect(stores.textContent).toContain(storesExpected);

        if (pIndex === PAGE_SIZE - 1) {
            /*
            Scenario 2: It can list stores that sell a book for each book
            GIVEN: I am on the All Books List page
            WHEN: I click the store count button for a book
            THEN: The stores that sell that book are listed by Seller full name, Available Stock, and Price
            AND: The correct amount is listed
            */

            /*
            Scenario 5: Pagination works correctly
            GIVEN: I am on the All Books List Page
            AND: There are more than 5 books
            WHEN: I click the next page button or the previous page button
            THEN: It navigates to the associated section of the book list
            */
            fireEvent.click(screen.getByTestId('nextbutton'));
            nodes = getBookItemData();
            await wait();
        }
    }
});

/*
Scenario 3: I can navigate to a Book’s main page from the All Books list Page
GIVEN: I am on the All Books list Page
WHEN: I click a book’s title
THEN: the site navigates to the ViewBook page
AND: A list of book stores that sell the book is displayed

Scenario 4: I can navigate to a Book For Sale from the All Books list Page
GIVEN: I am on the All Books List Page
AND: I am viewing a store's listing for a book
WHEN: I click the full name of a store in the list
THEN: I am navigated to the store’s page for that book
*/

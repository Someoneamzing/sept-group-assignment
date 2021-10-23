import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import Root from '../Root';

// import big mock server that mocks both books and login microservice
import '../testing_utils/bigMockServer';

import GET_API_BOOKS_RES, {
    GET_API_BOOKS_SEARCH_FIND_ALL_BY_BOOK_ID,
} from '../testing_utils/books_microservice/api.books';
import {PAGE_SIZE} from '../components/BookManagement/ViewAllBooks';
import {act} from 'react-dom/test-utils';
import GET_API_LOGIN_SEARCH_FINDALLBYIDIN from '../testing_utils/login_microservice/api.search.findAllByIdIn';
const APIsellerInfo = GET_API_LOGIN_SEARCH_FINDALLBYIDIN;

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
const wait = (time = 32) =>
    act(async () => {
        await later(time);
    });
test('SEP-75: Scenario 0: I see the book list items on the All Books Page', async () => {
    render(<Root />);
    // navigate to books
    fireEvent.click(screen.getAllByText('Books')[0]);
    // THEN: the books page displays all of the books with the title ‘All Books’
    await waitFor(() => screen.getByText('All Books'));
    // expand all book item store lists
    fireEvent.click(screen.getByTestId('expandall'));
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
    await wait();
    // AND: for each book I can see the book cover, the title, the author, the year published
    const getBookItemComponents = () => ({
        cover: screen.getAllByTestId('bookcover'),
        title: screen.getAllByTestId('booktitle'),
        author: screen.getAllByTestId('bookauthor'),
        year: screen.getAllByTestId('bookyear'),
        stores: screen.getAllByTestId('storecount'),
    });
    let nodes = getBookItemComponents();
    window.scrollTo = jest.fn();
    await wait();
    for (let i = 0; i < bData.length; i++) {
        const pIndex = i % PAGE_SIZE;
        const {coverArtURL, bookTitle, author, publishDate, id} = bData[i];
        const APIbookFSInfo =
            GET_API_BOOKS_SEARCH_FIND_ALL_BY_BOOK_ID[id]._embedded.bookForSales;
        const dataYear = publishDate.split('-')[0];
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
        const storesExpected = APIbookFSInfo.length
            ? APIbookFSInfo.length + ' Stores' + APIbookFSInfo.length === 1
                ? 's'
                : ''
            : 'Unavailable';
        expect(stores.textContent).toContain(storesExpected);
        /*
        Scenario 2: It can list stores that sell a book for each book
        GIVEN: I am on the All Books List page
        WHEN: I click the store count button for a book
        THEN: The stores that sell that book are listed by Seller full name, Available Stock, and Price
        AND: The correct amount is listed for each store in the list
        */
        let SBTSellerName = [];
        let SBTStock;
        let SBTPrice;
        if (APIbookFSInfo.length) {
            SBTSellerName = screen.getAllByTestId('SBTName_bookId_' + id);
            SBTStock = screen.getAllByTestId('SBTStock_bookId' + id);
            SBTPrice = screen.getAllByTestId('SBTPrice_bookId_' + id);
        }
        for (let j = 0; j < SBTSellerName.length; j++) {
            const APIsellerById = APIsellerInfo[APIbookFSInfo[j].sellerId][0];
            expect(SBTSellerName[j].textContent).toContain(
                APIsellerById.fullName
            );
            expect(SBTStock[j].textContent).toContain(
                APIbookFSInfo[j].availableStock
            );
            expect(SBTPrice[j].textContent).toContain(
                APIbookFSInfo[j].sellPriceInCents / 100
            );
        }

        if (pIndex === PAGE_SIZE - 1) {
            /*
            Scenario 5: Pagination works correctly
            GIVEN: I am on the All Books List Page
            AND: There are more than 5 books
            WHEN: I click the next page button or the previous page button
            THEN: It navigates to the associated section of the book list
            */
            fireEvent.click(screen.getByTestId('nextbutton'));
            nodes = getBookItemComponents();
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
*/

test('Scenario 3: I can navigate to a Book’s main page from the All Books list Page', async () => {
    render(<Root />);
    fireEvent.click(screen.getAllByText('Books')[0]);
    await waitFor(() => screen.getAllByTestId('booktitle'));
    const books = screen.getAllByTestId('booktitle');
    fireEvent.click(books[0]);
    await waitFor(() => screen.getByTestId('mainbookview'));
    const id = window.location.pathname.split('/').pop();
    const APIbookFSInfo =
        GET_API_BOOKS_SEARCH_FIND_ALL_BY_BOOK_ID[parseInt(id)]._embedded
            .bookForSales;
    let SBTSellerName = [];
    let SBTStock;
    let SBTPrice;
    if (APIbookFSInfo.length) {
        SBTSellerName = screen.getAllByTestId('SBTName_bookId_' + id);
        SBTStock = screen.getAllByTestId('SBTStock_bookId' + id);
        SBTPrice = screen.getAllByTestId('SBTPrice_bookId_' + id);
    }
    for (let j = 0; j < SBTSellerName.length; j++) {
        const APIsellerById = APIsellerInfo[APIbookFSInfo[j].sellerId][0];
        expect(SBTSellerName[j].textContent).toContain(APIsellerById.fullName);
        expect(SBTStock[j].textContent).toContain(
            APIbookFSInfo[j].availableStock
        );
        expect(SBTPrice[j].textContent).toContain(
            APIbookFSInfo[j].sellPriceInCents / 100
        );
    }
});

/*
Scenario 4: I can navigate to a Book For Sale from the All Books list Page
GIVEN: I am on the All Books List Page
AND: I am viewing a store's listing for a book
WHEN: I click the full name of a store in the list
THEN: I am navigated to the store’s page for that book
*/

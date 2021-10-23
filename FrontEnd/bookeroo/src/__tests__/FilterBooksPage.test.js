import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import MockRoot from '../testing_utils/MockRoot';
import { FilterBooksLayout } from '../components/BookManagement/FilterBooks';
// import 


// add mock book microservice to testing context
import '../testing_utils/books_microservice/mockServer';
import { act } from 'react-dom/test-utils';

// GIVEN the user goes to the filter page
// WHEN the user waits for some time for books to be fetched.
// THEN all books are displayed to the user
test('sep-91: the filter page display all the books to user', async () => {
    render(
        <MockRoot>
            <FilterBooksLayout />
        </MockRoot>
    );

    // load all books
    await waitFor(() => screen.getByText("The Test Book · Ming - Horror"));
    await waitFor(() => screen.getByText("The Test Book 2 · Ming - Horror"));
    await waitFor(() => screen.getByText("Test 3 · Ming - Fantasy"));
    await waitFor(() => screen.getByText("test 4 · Ming - action"));
    await waitFor(() => screen.getByText("test 5 · Ming - Fiction"));
});

// GIVEN the user is on the filter page
// WHEN the user clicks the horror button under categories
// THEN all the horror books are displayed to the user
test('sep-91: only display horror books to the user', async () => {
    render(
        <MockRoot>
            <FilterBooksLayout />
        </MockRoot>
    );

    await screen.findByRole('HorrorButton');
    act(() => { fireEvent.click(screen.getByRole('HorrorButton')) });

    await waitFor(() =>
        expect(screen.queryByText("Test 3 · Ming - Fantasy")).toBeNull(),
        screen.getByText("The Test Book · Ming - Horror"),
        screen.getByText("The Test Book 2 · Ming - Horror")
    );
});

// GIVEN the user clicks the horror button to see all horror books.
// WHEN the user clicks the all button under categories
// THEN the page displays all the books to the use
test('sep-91: the user wants to see all books again when the page is displaying all horror books', async () => {
    render(
        <MockRoot>
            <FilterBooksLayout />
        </MockRoot>
    );

    await screen.findByRole('HorrorButton');

    fireEvent.click(screen.getByRole("HorrorButton"));

    await screen.findByText('All');

    fireEvent.click(screen.getByText('All'));

    await waitFor(() => screen.getByText("The Test Book · Ming - Horror"));
    await waitFor(() => screen.getByText("The Test Book 2 · Ming - Horror"));
    await waitFor(() => screen.getByText("Test 3 · Ming - Fantasy"));
    await waitFor(() => screen.getByText("test 4 · Ming - action"));
    await waitFor(() => screen.getByText("test 5 · Ming - Fiction"));
});

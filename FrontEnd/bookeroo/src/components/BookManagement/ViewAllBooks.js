import {Box, Container} from '@material-ui/core';
import React, {Suspense} from 'react';
import {Link} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {bookAtomFamily, useAllBooksQuery} from '../../state/books';

function BookListItem({bookId}) {
    const bookData = useRecoilValue(bookAtomFamily(bookId));

    if (bookData == null) {
        return 'Book Not Found';
    }

    return (
        <Box width="100%">
            <Link to={`/book/${bookId}`}>
                {bookData.bookTitle} · {bookData.author}
            </Link>
        </Box>
    );
}

function ViewAllBooksLayout() {
    const {allBooks} = useAllBooksQuery();

    return (
        <Container maxWidth="lg">
            <h1>(debug) view all books</h1>
            <Box display="flex" flexDirection="column" width="100%">
                {allBooks.map((n) => (
                    <Suspense fallback="loading book">
                        <BookListItem bookId={n} />
                    </Suspense>
                ))}
            </Box>
        </Container>
    );
}

export default function ViewAllBooksPage() {
    return (
        <Suspense fallback="loading all books">
            <ViewAllBooksLayout />
        </Suspense>
    );
}

import { Box, Container } from '@material-ui/core';
import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { bookAtomFamily, FilterPageQuery } from '../../state/books/books';
import { Grid, Button } from '@material-ui/core';


function BookListItem({ bookId }) {
    const bookData = useRecoilValue(bookAtomFamily(bookId));

    if (bookData == null) {
        return 'Book Not Found';
    }

    return (
        <Box width="100%">
            <Link to={`/book/${bookId}`}>
                {bookData.bookTitle} · {bookData.author} - {bookData.genre}
            </Link>
        </Box>
    );
}

function displayBooks(allBooks) {
    return allBooks.map((n) => (
        <Suspense fallback="loading book" key={n}>
            <BookListItem bookId={n} />
        </Suspense>
    ))
}

export function FilterBooksLayout() {
    const [word, setWord] = useState("all")
    const { allBooks, genres } = FilterPageQuery(word);

    return (
        <Container maxWidth="lg">
            <h1>Categories</h1>
            <Grid container style={{ width: '100%', margin: '0 auto' }}>
                <Grid item xs={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={() => setWord("all")}
                    >
                        All
                    </Button>
                </Grid>
                {genres.map((n) => (
                    <Suspense fallback="loading authors" key={n}>
                        <Grid item xs={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                role={n + "Button"}
                                onClick={() => setWord(n)}
                            >
                                {n}
                            </Button>
                        </Grid>
                    </Suspense>
                ))}
            </Grid>

            <h1>(debugs) view all books</h1>
            <Box display="flex" flexDirection="column" width="100%">
                {displayBooks(allBooks)}
            </Box>
        </Container>
    );
}

export default function FilterBooksPage() {
    return (
        <Suspense fallback="loading all books">
            <FilterBooksLayout />
        </Suspense>
    );
}

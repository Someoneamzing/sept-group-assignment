import { Box, Container, Grid, Button } from '@material-ui/core';
import React, { Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { bookAtomFamily, FilterPageQuery } from '../../state/books/books';



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

export function FilterBooksLayout() {
    const [word, setWord] = useState("all")
    const { allBooks, genres } = FilterPageQuery(word);

    return (
        <Container maxWidth="lg">
            <h1>Categories</h1>
            {/* buttons for all categories  */}
            <Grid container spacing={2}>
                <Grid item xs={6} sm={4} lg={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        onClick={() => setWord("all")}
                    >
                        All
                    </Button>
                </Grid>
                {genres.map((n) => (
                    <Suspense fallback="loading category" key={n}>
                        <Grid item xs={6} sm={4} lg={3}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth={true}
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
                {allBooks.map((n) => (
                    <Suspense fallback="loading book" key={n}>
                        <BookListItem bookId={n} />
                    </Suspense>
                ))}
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

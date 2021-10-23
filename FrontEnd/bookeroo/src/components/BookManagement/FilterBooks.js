import {Container, Grid, Button} from '@material-ui/core';
import React, {Suspense, useState} from 'react';
import {atom, useRecoilState} from 'recoil';
import searchParamsEffect from '../../state/atom_effects/searchParamsEffect';
import {useFilterPageQuery} from '../../state/books/books';
import {ViewAllBooksLayout} from './ViewAllBooks';

const expandAllAtom = atom({
    key: 'expandAllAtom/QueryPage',
    default: false,
});
export const PAGE_SIZE = 5;

const listOffsetAtom = atom({
    key: 'listOffsetAtom/QueryPage',
    default: 0,
    effects_UNSTABLE: [searchParamsEffect('offset', 0)],
});

export function FilterBooksLayout() {
    const [word, setWord] = useState('all');
    const {genres} = useFilterPageQuery(word);
    const useAllBooks = () => useFilterPageQuery(word);
    const useExpandAll = () => useRecoilState(expandAllAtom);
    const useListOffset = () => useRecoilState(listOffsetAtom);
    return (
        <Container maxWidth="sm">
            <h1>Filter Books</h1>
            {/* buttons for all categories  */}
            <Grid container spacing={2}>
                <Grid item xs={6} sm={4} lg={3}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth={true}
                        onClick={() => setWord('all')}
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
                                role={n + 'Button'}
                                onClick={() => setWord(n)}
                            >
                                {n}
                            </Button>
                        </Grid>
                    </Suspense>
                ))}
            </Grid>

            <ViewAllBooksLayout
                useAllBooks={useAllBooks}
                useExpandAll={useExpandAll}
                useListOffset={useListOffset}
            />
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

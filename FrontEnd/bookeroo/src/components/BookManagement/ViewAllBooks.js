import {
    Box,
    Button,
    Container,
    FormControlLabel,
    makeStyles,
    Switch,
} from '@material-ui/core';
import React, {Suspense} from 'react';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import searchParamsEffect from '../../state/atom_effects/searchParamsEffect';
import {useAllBooksQuery} from '../../state/books/books';
import BookListItem from './BookListItem';
import CreateBook from './_DEBUG_components/CreateBook';

const expandAllAtom = atom({
    key: 'expandAllAtom',
    default: false,
});

export const PAGE_SIZE = 5;

const listOffsetAtom = atom({
    key: 'listOffsetAtom',
    default: 0,
    effects_UNSTABLE: [searchParamsEffect('offset', 0)],
});

function ViewAllBooksLayout() {
    const {allBooks, loadBooks} = useAllBooksQuery(false);
    const [expandAll, setExpandAll] = useRecoilState(expandAllAtom);
    const listOffset = useRecoilValue(listOffsetAtom);
    return (
        <Container maxWidth="sm">
            <div style={{width: '100%', position: 'relative'}}>
                <h1 style={{width: '50%', textAlign: 'left'}}>All Books</h1>
                <h3 style={{width: '50%', textAlign: 'left'}}>
                    <span data-testid="bookcount">{allBooks.length} Books</span>{' '}
                    •{' '}
                    <span data-testid="bookpagecount">
                        Page {listOffset / PAGE_SIZE + 1} of{' '}
                        {Math.ceil(allBooks.length / PAGE_SIZE)}
                    </span>
                </h3>
                <div style={{position: 'absolute', right: 0, top: 0}}>
                    <Box display="flex" flexDirection="row">
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={expandAll}
                                    onChange={() => setExpandAll((x) => !x)}
                                    color="secondary"
                                    inputProps={{
                                        'aria-label': 'Show books for sale',
                                    }}
                                />
                            }
                            label={expandAll ? 'Expanded ' : 'Compact'}
                        />
                    </Box>
                </div>
            </div>
            <Box display="flex" flexDirection="column" width="100%">
                {allBooks.slice(listOffset, listOffset + PAGE_SIZE).map((n) => (
                    <Suspense fallback="loading book" key={n}>
                        <BookListItem bookId={n} expandAll={expandAll} />
                    </Suspense>
                ))}
                <PageControls totalLength={allBooks.length} />
            </Box>
            <CreateBook reload={() => loadBooks()} />
        </Container>
    );
}

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

function PageControls({totalLength}) {
    const classes = useStyles();
    const [listOffset, setListLength] = useRecoilState(listOffsetAtom);

    return (
        <Box>
            <Button
                disabled={listOffset <= 0}
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => setListLength((x) => x - PAGE_SIZE)}
                className={classes.margin}
            >
                Back
            </Button>
            <Button
                data-testid="nextbutton"
                disabled={listOffset >= totalLength - PAGE_SIZE}
                variant="contained"
                color="primary"
                size="medium"
                onClick={() => {
                    setListLength((x) => x + PAGE_SIZE);
                    window.scrollTo({top: 0, behavior: 'auto'});
                }}
                className={classes.margin}
            >
                Next
            </Button>
        </Box>
    );
}

export default function ViewAllBooksPage() {
    return (
        // <Suspense fallback="loading all books">
        <ViewAllBooksLayout />
        // </Suspense>
    );
}

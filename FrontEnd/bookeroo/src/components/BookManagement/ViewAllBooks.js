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
import {useAllBooksQuery} from '../../state/books/books';
import BookListItem from './BookListItem';
import CreateBook from './_DEBUG_components/CreateBook';

const expandAllAtom = atom({
    key: 'expandAllAtom',
    default: false,
});

const listLengthAtom = atom({
    key: 'listLengthAtom',
    default: 5,
});

function ViewAllBooksLayout() {
    const {allBooks, loadBooks} = useAllBooksQuery(false);
    const [expandAll, setExpandAll] = useRecoilState(expandAllAtom);
    const listLength = useRecoilValue(listLengthAtom);
    return (
        <Container maxWidth="sm">
            <div style={{width: '100%', position: 'relative'}}>
                <h1 style={{width: '50%', textAlign: 'left'}}>All Books</h1>
                <h3 style={{width: '50%', textAlign: 'left'}}>
                    {allBooks.length} books, {parseInt(allBooks.length / 5)}{' '}
                    pages
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
                {allBooks.slice(listLength - 5, listLength).map((n) => (
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
    const [listLength, setListLength] = useRecoilState(listLengthAtom);

    return (
        <Box>
            {listLength - 5 > 0 && (
                <Button
                    size="medium"
                    onClick={() => setListLength((x) => x - 5)}
                    className={classes.margin}
                >
                    Previous Page
                </Button>
            )}
            {listLength < totalLength && (
                <Button
                    size="medium"
                    onClick={() => {
                        setListLength((x) => x + 5);
                        window.scrollTo({top: 0, behavior: 'auto'});
                    }}
                    className={classes.margin}
                >
                    Next Page
                </Button>
            )}
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

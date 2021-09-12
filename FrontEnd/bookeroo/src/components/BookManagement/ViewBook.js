import React, {Suspense} from 'react';
import {Button, Container, Divider, Paper} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {useParams} from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Reviews, {RatingContainer} from './Reviews';
import {useRecoilValue} from 'recoil';
import {bookAtomFamily} from '../../state/books/books';
import CreateBookDebug from './_DEBUG_components/CreateBook';
import NoMatch from '../Layout/NoMatch';
import {useTheme} from '@material-ui/core/styles';

function BookImage({coverArtURL}) {
    return (
        <img
            src={coverArtURL}
            width="234px"
            alt="book cover"
            style={{marginBottom: '1rem'}}
        />
    );
}

function BookPreview({tableOfContents, bookTitle}) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const close = () => setOpen(false);
    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setOpen((x) => !x)}
            >
                {open ? 'Hide Preview' : 'Preview Book'}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={close}
                scroll="paper"
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {bookTitle}
                </DialogTitle>
                <DialogContent>
                    <i>Table of Contents:</i>
                    {tableOfContents.split('\n').map((n, i) => (
                        <Box margin="0.2rem" key={n + i}>
                            <DialogContentText>{n}</DialogContentText>
                        </Box>
                    ))}
                    <DialogActions>
                        <Button onClick={close} color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </>
    );
}

function BookInfo(props) {
    const {bookTitle, author, publisher, isbn, publishDate, bookId} = props;
    return (
        <Box textAlign="left" padding="1rem">
            <h2>{bookTitle}</h2>
            <i>{author}</i>
            <Box padding="0.5rem" />
            <Divider />
            <h3>Publisher: {publisher}</h3>
            <h3>ISBN: {isbn}</h3>
            <h3>Publish Date: {new Date(publishDate).toDateString()}</h3>
            <RatingContainer bookId={bookId} />
            <Box display="flex" flexDirection="row" padding="0.5rem">
                <BookPreview {...props} />
            </Box>
        </Box>
    );
}

export function ViewBookLayout(props) {
    return (
        <div>
            <Container maxWidth="lg">
                <Box
                    maxWidth="sm"
                    display="flex"
                    flexWrap="wrap"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Box
                        maxWidth="sm"
                        display="flex"
                        flexWrap="wrap"
                        flexDirection="row"
                        justifyContent="space-around"
                    >
                        <BookImage {...props} />
                        <BookInfo {...props} />
                    </Box>
                    <Paper variant="outlined">
                        <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="space-around"
                            margin="2rem"
                            height="85%"
                        >
                            {props.RightBox}
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </div>
    );
}

function ViewBookContainer({bookId}) {
    const bookData = useRecoilValue(bookAtomFamily(bookId));

    if (bookData == null) {
        return <NoMatch />;
    }
    return (
        <>
            <ViewBookLayout
                {...{...bookData, bookId}}
                RightBox={<>Pretend there is a list of sellers here</>}
            />
            <Reviews bookId={bookId} />
        </>
    );
}

export function ViewBookSuspense({bookId}) {
    return (
        <Suspense fallback="loading book">
            <CreateBookDebug />
            <ViewBookContainer bookId={bookId} />
        </Suspense>
    );
}

export default function ViewBookPage() {
    const {bookId} = useParams();

    return (
        <>
            <ViewBookSuspense bookId={bookId} />
        </>
    );
}

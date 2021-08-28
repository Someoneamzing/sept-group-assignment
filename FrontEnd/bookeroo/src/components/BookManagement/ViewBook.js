import React, {Suspense} from 'react';
import {
    Button,
    Container,
    Divider,
    Paper,
    TextField
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {useParams} from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Reviews from './Reviews';
import {useRecoilValue} from 'recoil';
import {bookAtomFamily} from '../../state/books';

function BookImage({cover_img}) {
    return <img src={cover_img} style={{marginBottom: '1rem'}} />;
}

function BookInfo({title, author, publisher, isbn, date_published, rating}) {
    return (
        <Box textAlign="left" padding="1rem">
            <h2>{title}</h2>
            <i>{author}</i>
            <Box padding="0.5rem" />
            <Divider />
            <h3>Publisher: {publisher}</h3>
            <h3>ISBN: {isbn}</h3>
            <h3>
                Publish Date: {new Date(date_published * 1000).toDateString()}
            </h3>
            <div>
                {Array(Math.round(rating * 5)).fill(<StarIcon />)}
                {Array(Math.floor((1 - rating) * 5)).fill(<StarBorderIcon />)}
            </div>
            <Box display="flex" flexDirection="row" padding="0.5rem">
                <Button variant="contained" color="secondary">
                    Preview Book
                </Button>
            </Box>
        </Box>
    );
}

function Purchase({price}) {
    return (
        <Paper elevation={2} variant="outlined">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                margin="2rem"
                height="85%"
            >
                <h1>${price}</h1>
                <div>
                    <TextField
                        id="standard-basic"
                        label="Quantity"
                        type="number"
                    />
                </div>
                <div>
                    <Button variant="contained" color="primary" size="large">
                        Add to Order <pre> </pre>
                        <AddShoppingCartIcon />
                    </Button>
                </div>
            </Box>
        </Paper>
    );
}

export function ViewBookLayout(props) {
    return (
        <div>
            <Container maxWidth="lg">
                <Box
                    style={{display: 'flex'}}
                    maxWidth="sm"
                    flex
                    flexWrap="wrap"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Box
                        style={{display: 'flex'}}
                        maxWidth="sm"
                        flex
                        flexWrap="wrap"
                        flexDirection="row"
                        justifyContent="space-around"
                    >
                        <BookImage {...props} />
                        <BookInfo {...props} />
                    </Box>
                    <Purchase {...props} />
                </Box>
                <Reviews {...props} />
            </Container>
        </div>
    );
}

function ViewBookContainer({bookId}) {
    const bookData = useRecoilValue(bookAtomFamily(bookId));
    return <ViewBookLayout {...bookData} />;
}

export default function ViewBookPage() {
    const {bookId} = useParams();
    return (
        <Suspense fallback="loading book (hard coded 2 second load time)">
            <ViewBookContainer bookId={bookId} />
        </Suspense>
    );
}

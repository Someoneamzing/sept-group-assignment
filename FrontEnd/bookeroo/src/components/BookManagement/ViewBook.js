import React from 'react';
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

function BookInfo({bookId}) {
    return (
        <Box textAlign="left" padding="1rem">
            <h2>The Curious Incident of the Dog in the Night-Time</h2>
            <i>(author)</i>
            <Box padding="0.5rem" />
            <Divider />
            <h3>Publisher: sdfsdfsd</h3>
            <h3>ISBN: 73569495</h3>
            <h3>Publish Date: 05/07/2021</h3>
            <div>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarBorderIcon />
            </div>
            <Box display="flex" flexDirection="row" padding="0.5rem">
                <Button variant="contained" color="secondary">
                    Preview Book
                </Button>
            </Box>
        </Box>
    );
}

function Purchase({bookId}) {
    return (
        <Paper elevation={2} variant="outlined">
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                margin="2rem"
                height="85%"
            >
                <h1>$10.99</h1>
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
                        <img
                            src="/bookbook.png"
                            style={{marginBottom: '1rem'}}
                        />
                        <BookInfo bookId={bookId} />
                    </Box>
                    <Purchase />
                </Box>
                <Reviews bookId={bookId} />
            </Container>
        </div>
    );
}

import React from 'react';
import {
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import {useParams} from 'react-router-dom';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

function Review() {
    return (
        <Box textAlign="left" margin="1rem">
            <Box margin="0.5rem" display="flex" justifyContent="start">
                <AccountCircleIcon />
                <span style={{marginLeft: '1rem'}}>(Name)</span>
            </Box>
            <Box margin="0.5rem">
                <span style={{marginRight: '1rem'}}>4/5</span>
                <span>(Review Date)</span>
            </Box>
            <Box margin="0.5rem">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Praesent neque felis, aliquet mattis tellus id, faucibus
                ultricies ex. Vestibulum in commodo tortor. Nulla mattis nulla
                nec interdum ullamcorper. Nullam non convallis dui. Praesent
                magna tortor, tincidunt in ipsum a, pellentesque ultrices
                ligula. Vivamus metus neque, blandit eget condimentum eget,
                finibus eget erat. Integer vitae mi sit amet nisi commodo
                scelerisque. Donec dictum luctus pharetra. Morbi vel rhoncus
                mauris, eleifend porta lectus. Cras vestibulum lacus lorem, et
                gravida tortor hendrerit et. Curabitur massa urna, laoreet eu
                felis a, varius sagittis ante. Praesent ut leo porta, viverra
                turpis eget, auctor magna. Nulla hendrerit euismod laoreet.
                Curabitur elit massa, dignissim ut hendrerit in, aliquam ac
                arcu. Proin quam dolor, tempus at leo vel, commodo condimentum
                justo.
            </Box>
        </Box>
    );
}

function Reviews() {
    return (
        <Box style={{marginTop: '1rem'}}>
            <Paper elevation={2} variant="outlined">
                <Box>
                    <h4>Reviews</h4>
                    <Review />
                </Box>
            </Paper>
        </Box>
    );
}

export default function ViewBook() {
    let {bookId} = useParams();

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

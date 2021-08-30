import React from 'react';
import {Container, Paper} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {Suspense} from 'react-is';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

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

function Rating({bookId}) {
    const rating = 1 / 5;
    return (
        <div>
            {Array(Math.round(rating * 5))
                .fill('i')
                .map((n, i) => (
                    <StarIcon key={n + i} />
                ))}
            {Array(Math.floor((1 - rating) * 5))
                .fill('b')
                .map((n, i) => (
                    <StarBorderIcon key={n + i} />
                ))}
        </div>
    );
}

export function RatingContainer({bookId}) {
    return (
        <Suspense fallback="loading rating">
            <Rating bookId={bookId} />
        </Suspense>
    );
}
export default function Reviews({bookId}) {
    return (
        <Suspense fallback="loading reviews">
            <Box style={{marginTop: '1rem'}}>
                <Container maxWidth="lg">
                    <Paper elevation={2} variant="outlined">
                        <Box>
                            <h4>(wireframe) Reviews</h4>
                            <Review />
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </Suspense>
    );
}

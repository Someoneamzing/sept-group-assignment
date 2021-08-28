import React from 'react';
import {Paper} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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
export default function Reviews() {
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

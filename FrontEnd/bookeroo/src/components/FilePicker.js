import {Paper} from '@material-ui/core';
import {AddPhotoAlternate} from '@material-ui/icons';
import React from 'react';

export default function FilePicker({}) {
    return (
        <Paper>
            <AddPhotoAlternate style={{fontSize: '7em'}} color="disabled" />
            <span>Select some Cover Art</span>
        </Paper>
    );
}

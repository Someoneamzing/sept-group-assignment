import React from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import {TextField, Grid, Button} from '@material-ui/core';
import FilePicker from './FilePicker';
import styles from './AddBookForm.css';

/**
 *
 * @param {import('formik').FormikProps<{}>} formik
 * @param {string} label
 * @param {string} name
 * @returns
 */
function inputProps(formik, label, name) {
    return {
        label,
        name,
        onChange: formik.handleChange,
        value: formik.values[name],
        onBlur: formik.handleBlur,
        error: formik.errors[name],
        helperText: formik.errors[name],
        disabled: formik.isSubmitting,
    };
}

/**
 * The form that handles adding Book entities to the system.
 * @note This form is not for the sale pages, just the definition of a book, with title author etc.
 */
export default function AddBookForm() {
    const formik = useFormik({
        initialValues: {
            bookTitle: '',
            author: '',
            publisher: '',
            publishDate: '',
            isbn: '',
            coverArtURL: '',
            tableOfContents: '',
        },
        async onSubmit(values) {
            try {
                const url = new URL(`/api/books`, document.location);
                url.port = 8081;
                const response = await axios.post(url, values);
                console.log(response.data);
                // const response = await fetch(url, {
                //     method: 'POST',
                //     body: JSON.stringify(values),
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                // });
                // if (!response.ok())
                //     throw new Error(
                //         `[${response.status}]: ${response.statusText}`
                //     );
                // console.log(
                //     `Recieved response from API: ${await response.text()}`
                // );
            } catch (err) {
                console.error(err.toJSON());
            }
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className={`${styles.form}`}>
            {/* <Grid container spacing={2}> */}
            {/* <Grid item xs={12}> */}
            <TextField
                fullWidth
                {...inputProps(formik, 'Book Title', 'bookTitle')}
                variant="outlined"
            />
            {/* </Grid> */}
            {/* <Grid item> */}
            <TextField
                fullWidth
                {...inputProps(formik, 'Author', 'author')}
                variant="outlined"
            />
            {/* </Grid> */}
            {/* <Grid item> */}
            <TextField
                fullWidth
                {...inputProps(formik, 'Publisher', 'publisher')}
                variant="outlined"
            />
            {/* </Grid> */}
            {/* <Grid item> */}
            <TextField
                fullWidth
                {...inputProps(formik, 'Publish Date', 'publishDate')}
                variant="outlined"
                type="date"
            />
            {/* </Grid> */}
            {/* <Grid item> */}
            <TextField
                fullWidth
                {...inputProps(formik, 'ISBN', 'isbn')}
                variant="outlined"
            />
            {/* </Grid> */}
            {/* <Grid item> */}
            <TextField
                fullWidth
                {...inputProps(formik, 'Table of Contents', 'tableOfContents')}
                variant="outlined"
                multiline
            />
            {/* </Grid> */}
            {/* <Grid item> */}
            <FilePicker></FilePicker>
            {/* </Grid> */}
            {/* </Grid> */}
            <Button type="submit">Submit</Button>
        </form>
    );
}

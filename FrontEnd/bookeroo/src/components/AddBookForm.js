import React from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import {TextField, Button} from '@material-ui/core';
import FilePicker from './FilePicker';
import './AddBookForm.css';

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
        <form onSubmit={formik.handleSubmit} className="AddBookForm-form">
            <h3 className="AddBookForm-title">Add a Book</h3>
            <TextField
                fullWidth
                {...inputProps(formik, 'Book Title', 'bookTitle')}
                variant="outlined"
                className="AddBookForm-bookTitle"
            />
            <TextField
                fullWidth
                {...inputProps(formik, 'Author', 'author')}
                variant="outlined"
                className="AddBookForm-author"
            />
            <TextField
                fullWidth
                {...inputProps(formik, 'Publisher', 'publisher')}
                variant="outlined"
                className="AddBookForm-publisher"
            />
            <TextField
                fullWidth
                {...inputProps(formik, 'Publish Date', 'publishDate')}
                variant="outlined"
                type="date"
                className="AddBookForm-publishDate"
            />
            <TextField
                fullWidth
                {...inputProps(formik, 'ISBN', 'isbn')}
                variant="outlined"
                className="AddBookForm-isbn"
            />
            <TextField
                fullWidth
                {...inputProps(formik, 'Table of Contents', 'tableOfContents')}
                variant="outlined"
                multiline
                className="AddBookForm-tableOfContents"
            />
            <FilePicker
                onChange={(files) =>
                    formik.setFieldValue(
                        'coverArtURL',
                        files.length ? files[0] : ''
                    )
                }
                className="AddBookForm-coverArt"
            />
            <div className="AddBookForm-actions">
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </div>
        </form>
    );
}

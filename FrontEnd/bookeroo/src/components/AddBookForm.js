import React from 'react';
import {useFormik} from 'formik';
import {TextField, Button} from '@material-ui/core';
import FilePicker from './FilePicker';
import './AddBookForm.css';
import {createBook} from '../api';
import {inputProps} from '../utils';

/**
 * The default values used when opening a book form
 */
const BOOK_DEFAULT = {
    bookTitle: '',
    author: '',
    publisher: '',
    publishDate: '',
    isbn: '',
    coverArtURL: '',
    tableOfContents: '',
};

/**
 * The form that handles adding Book entities to the system.
 * @note This form is not for the sale pages, just the definition of a book, with title author etc.
 */
export default function AddBookForm({
    onSubmit: onSubmitExt,
    onCancel,
    ContentComponent,
    ActionComponent,
    defaultValue = {},
}) {
    const formik = useFormik({
        initialValues: {...BOOK_DEFAULT, ...defaultValue},
        async onSubmit(values) {
            console.log('Submitting new book...');
            try {
                const response = await createBook(values);
                onSubmitExt(response);
            } catch (err) {
                console.error(err.toJSON());
            }
        },
    });
    return (
        <>
            <ContentComponent>
                <form
                    onSubmit={formik.handleSubmit}
                    className="AddBookForm-form"
                >
                    <TextField
                        {...inputProps(formik, 'Book Title', 'bookTitle')}
                        fullWidth
                        variant="outlined"
                        className="AddBookForm-bookTitle"
                    />
                    <TextField
                        {...inputProps(formik, 'Author', 'author')}
                        fullWidth
                        variant="outlined"
                        className="AddBookForm-author"
                    />
                    <TextField
                        {...inputProps(formik, 'Publisher', 'publisher')}
                        fullWidth
                        variant="outlined"
                        className="AddBookForm-publisher"
                    />
                    <TextField
                        {...inputProps(formik, 'Publish Date', 'publishDate')}
                        fullWidth
                        variant="outlined"
                        type="date"
                        className="AddBookForm-publishDate"
                        inputProps={{placeholder: ''}}
                    />
                    <TextField
                        {...inputProps(formik, 'ISBN', 'isbn')}
                        fullWidth
                        variant="outlined"
                        className="AddBookForm-isbn"
                    />
                    <TextField
                        {...inputProps(
                            formik,
                            'Table of Contents',
                            'tableOfContents'
                        )}
                        fullWidth
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
                </form>
            </ContentComponent>
            <ActionComponent className="AddBookForm-actions">
                <Button
                    type="button"
                    variant="contained"
                    color="default"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    onClick={formik.handleSubmit}
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </ActionComponent>
        </>
    );
}

import {Button, InputAdornment, TextField} from '@material-ui/core';
import BookField from './BookField';
import {Formik, useFormik} from 'formik';
import React from 'react';
import {inputProps} from '../utils';

export default function AddBookForSaleForm({onSubmit, ...props}) {
    const formikProps = {
        initialValues: {
            book: null,
            availableStock: 0,
            salePriceInCents: 0,
        },
        onSubmit,
    };
    return (
        <Formik {...formikProps}>
            {(formik) => {
                return (
                    <form
                        onSubmit={formik.handleSubmit}
                        onReset={formik.handleReset}
                    >
                        <BookField
                            {...inputProps(formik, 'Book', 'book')}
                            placeholder="Select a Book"
                        />
                        <TextField
                            {...inputProps(
                                formik,
                                'Sale Price',
                                'salePriceInCents'
                            )}
                            fullWidth
                            variant="outlined"
                            type="number"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        $
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                step: '0.01',
                            }}
                        />
                        <TextField
                            {...inputProps(
                                formik,
                                'Available Stock',
                                'availableStock'
                            )}
                            fullWidth
                            variant="outlined"
                            type="number"
                            inputProps={{
                                step: '1',
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </form>
                );
            }}
        </Formik>
    );
}

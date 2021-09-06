import {Button, InputAdornment, TextField} from '@material-ui/core';
import BookField from './BookField';
import {Formik} from 'formik';
import React from 'react';
import {inputProps} from '../utils';
import {createBookForSale} from '../api';

/**
 * A form for adding a BookForSale.
 * @param {Object} props
 * @returns An AddBookForSaleForm component.
 */
export default function AddBookForSaleForm({onSubmit, ...props}) {
    const formikProps = {
        initialValues: {
            book: null,
            availableStock: 0,
            salePriceInCents: 0,
        },
        onSubmit: async (values) => {
            await createBookForSale({...values, sellerId: 0});
        },
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
                                'sellPriceInCents'
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

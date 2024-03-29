import {Button, InputAdornment, TextField} from '@material-ui/core';
import BookField from './BookField';
import {Formik} from 'formik';
import React from 'react';
import {inputProps} from '../../utils';
import {createBookForSale} from '../../api';
import {Container} from '@material-ui/core';
import Box from '@material-ui/core/Box';

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
            const response = await createBookForSale({...values, sellerId: 0});
            onSubmit(response);
        },
    };
    return (
        <Container maxWidth="sm">
            <h1>Add Books For Sale</h1>
            <Formik {...formikProps}>
                {(formik) => {
                    return (
                        <form
                            onSubmit={formik.handleSubmit}
                            onReset={formik.handleReset}
                            data-testid="add-book-for-sale-form"
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
                                margin="normal"
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
                                margin="normal"
                                inputProps={{
                                    step: '1',
                                }}
                            />
                            <Box mt={1}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Submit
                                </Button>
                            </Box>
                        </form>
                    );
                }}
            </Formik>
        </Container>
    );
}

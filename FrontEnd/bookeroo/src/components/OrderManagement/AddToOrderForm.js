import React from 'react';
import {Formik, Form} from 'formik';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {inputProps} from '../../utils';

export default function AddToOrderForm({bookForSale, ...props}) {
    return (
        <Formik
            initialValues={{
                quantity: 1,
            }}
        >
            {(formik) => (
                <Form>
                    <Box flexDirection="column" alignItems="stretch">
                        <TextField
                            {...inputProps(formik, 'Quantity', 'quantity')}
                        />
                        <Button variant="contained" color="primary">
                            Add to Order
                        </Button>
                    </Box>
                </Form>
            )}
        </Formik>
    );
}

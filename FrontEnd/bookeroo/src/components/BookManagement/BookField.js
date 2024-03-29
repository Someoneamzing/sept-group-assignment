import React, {useEffect, useState} from 'react';
import {useField} from 'formik';
import AddBookForm from './AddBookForm';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Magnify from '../../assets/magnify.jpg';
import {
    TextField,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from '@material-ui/core';
import BookThumbnail from './BookThumbnail';
import {getBooks} from '../../api';

/**
 * A filed for selecting a book. Displays a list of already available books and can configurably allow creation of new books.
 * @param {Object} props
 * @returns A BookField Component
 */
export default function BookField({allowCreate, ...props}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogValue, setDialogValue] = useState(null);
    const [inputProps, , helper] = useField(props);
    const [options, setOptions] = useState([]);
    const loading = options.length === 0;
    useEffect(() => {
        let active = true;

        if (!loading) return undefined;

        (async () => {
            const books = await getBooks();
            if (active) setOptions(books);
        })();

        return () => (active = false);
    }, [loading]);
    return (
        <div>
            <Autocomplete
                id="book-select"
                value={inputProps.value}
                onChange={(e, newValue) => {
                    if (typeof newValue === 'string') {
                        setDialogOpen(true);
                        setDialogValue({
                            bookTitle: newValue,
                        });
                    } else if (newValue && newValue.inputValue) {
                        setDialogOpen(true);
                        setDialogValue({
                            bookTitle: newValue.inputValue,
                        });
                    } else {
                        helper.setValue(newValue);
                    }
                }}
                noOptionsText="No Books"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            'data-testid': 'autocomplete-input',
                        }}
                        label="Book"
                        variant="outlined"
                    />
                )}
                renderTags={() => null}
                getOptionLabel={(option) => option.bookTitle}
                getOptionSelected={(option, value) =>
                    option.bookTitle === value.bookTitle
                }
                loading={loading}
                options={options}
                disablePortal
                openOnFocus
                filterOptions={(options, params) => {
                    const filtered = options.filter(
                        (option) =>
                            option.bookTitle.indexOf(params.inputValue) >= 0
                    );
                    if (params.inputValue.trim() !== '') {
                        filtered.push({
                            bookTitle: 'Add ' + params.inputValue + ' to Sale',
                            inputValue: params.inputValue,
                            author: 'Book not found',
                            coverArtURL: Magnify,
                        });
                    }
                    return filtered;
                }}
                renderOption={(option, {selected}) => {
                    return <BookThumbnail book={option} selected={selected} />;
                }}
            />
            {loading && <span>Loading...</span>}
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                maxWidth="lg"
            >
                <DialogTitle data-testid="dialog-title">Add a Book</DialogTitle>
                <AddBookForm
                    ContentComponent={DialogContent}
                    ActionComponent={DialogActions}
                    onSubmit={(book) => {
                        helper.setValue(book);
                        setDialogOpen(false);
                    }}
                    onCancel={() => setDialogOpen(false)}
                    defaultValue={dialogValue}
                ></AddBookForm>
            </Dialog>
        </div>
    );
}

import {Box, Button, Paper, TextField} from '@material-ui/core';
import React, {Suspense} from 'react';
import {useRecoilValue} from 'recoil';
import {bookAtomFamily} from '../../state/books';
import {useBookForSale} from '../../state/booksForSale';
import {ViewBookLayout} from './ViewBook';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import NoMatch from '../Layout/NoMatch';
import {useParams} from 'react-router';
import CreateBook from './_DEBUG_components/CreateBook';
import Reviews from './Reviews';

function PurchaseLayout({sellPriceInCents, availableStock}) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            margin="2rem"
            height="85%"
        >
            <h1>${sellPriceInCents / 1000}</h1>
            <div>
                <b>{availableStock || '?'}</b> units left
            </div>
            <div>
                <TextField id="standard-basic" label="Quantity" type="number" />
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => alert("this doesn't do anything lol")}
                >
                    Add to Order <pre> </pre>
                    <AddShoppingCartIcon />
                </Button>
            </div>
        </Box>
    );
}

function PurchaseContainer({bookId}) {
    const bookForSaleData = useBookForSale(bookId);

    if (bookForSaleData == null) {
        return <NoMatch />;
    }

    return <PurchaseLayout {...bookForSaleData} />;
}

function ViewBookForSaleContainer({bookId}) {
    const bookData = useRecoilValue(bookAtomFamily(bookId));

    if (bookData == null) {
        return <NoMatch />;
    }

    return (
        <ViewBookLayout
            {...bookData}
            RightBox={
                <Suspense fallback={'Loading store data'}>
                    <PurchaseContainer bookId={bookId} />
                </Suspense>
            }
        />
    );
}

export default function ViewBookForSalePage() {
    const {bookId} = useParams();

    return (
        <>
            <Suspense fallback="loading book (hard coded 2 second load time)">
                <CreateBook />
                <ViewBookForSaleContainer bookId={bookId} />
            </Suspense>
            <Reviews bookId={bookId} />
        </>
    );
}

import {Box, Button, TextField} from '@material-ui/core';
import React, {Suspense} from 'react';
import {useBookAtomFamily} from '../../state/books/books';
import {useBookForSaleAtomFamily} from '../../state/books/booksForSale';
import {ViewBookLayout} from './ViewBook';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import NoMatch from '../Layout/NoMatch';
import {useParams} from 'react-router';
import Reviews from './Reviews';
import {useBusinessUserAtomFamily} from '../../state/user/search/businessUser';

function PurchaseLayout({sellPriceInCents, availableStock}) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            margin="2rem"
            height="85%"
        >
            <h1>${sellPriceInCents / 100}</h1>
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

function PurchaseContainer({bookFSId}) {
    const bookForSaleData = useBookForSaleAtomFamily(bookFSId);

    if (bookForSaleData == null) {
        return <NoMatch />;
    }

    return <PurchaseLayout {...bookForSaleData} />;
}

function ViewBookForSaleContainer({bookFSId}) {
    const bookFSData = useBookForSaleAtomFamily(bookFSId);
    const bookData = useBookAtomFamily(bookFSData.bookKey);
    if (bookData == null) {
        return <NoMatch />;
    }

    return (
        <ViewBookLayout
            {...bookData}
            RightBox={
                <Suspense fallback={'Loading store data'}>
                    <PurchaseContainer bookFSId={bookFSId} />
                </Suspense>
            }
        />
    );
}

function SellerInfoContainer({sellerId}) {
    const sellerInfo = useBusinessUserAtomFamily(sellerId);
    if (!sellerInfo) {
        return <NoMatch />;
    }
    return <h2>{sellerInfo.fullName}</h2>;
}

export default function ViewBookForSalePage() {
    const {sellerId, bookFSId} = useParams();
    return (
        <>
            <Suspense fallback="loading seller">
                <SellerInfoContainer sellerId={sellerId} />
            </Suspense>
            <Suspense fallback="loading book">
                <ViewBookForSaleContainer bookFSId={bookFSId} />
            </Suspense>
            <Reviews bookId={bookFSId} />
        </>
    );
}

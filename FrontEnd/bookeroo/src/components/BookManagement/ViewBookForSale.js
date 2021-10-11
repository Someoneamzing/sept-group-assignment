import {Box, Button, CircularProgress, TextField} from '@material-ui/core';
import React, {Suspense, useEffect, useState} from 'react';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {bookAtomFamily} from '../../state/books/books';
import {useBookForSale} from '../../state/books/booksForSale';
import {ViewBookLayout} from './ViewBook';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import DoneIcon from '@material-ui/icons/Done';
import NoMatch from '../Layout/NoMatch';
import {useParams} from 'react-router';
import CreateBook from './_DEBUG_components/CreateBook';
import Reviews from './Reviews';
import {idFromURL} from '../../state/utils';
import {createOrderItem} from '../../api';
import {userAtom} from '../../state/user/authentication';

function PurchaseLayout({sellPriceInCents, availableStock, _links}) {
    const [loading, setLoading] = useState();
    const [success, setSuccess] = useState();
    const [quantity, setQuantity] = useState(1);
    const user = useRecoilValue(userAtom);
    const bookForSaleId = idFromURL(_links.self.href);
    // Reset success to false after 5 seconds.
    useEffect(() => {
        let timer = null;
        if (success) {
            timer = setTimeout(() => {
                timer = null;
                setSuccess(false);
            }, 5000);
        }
        return () => timer && clearTimeout(timer);
    }, [success]);

    async function handleAddButtonClick() {
        setSuccess(false);
        setLoading(true);
        await createOrderItem({
            item: {costInCents: sellPriceInCents, bookForSaleId, quantity},
            token: user.token,
        });
    }

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
                <TextField
                    id="standard-basic"
                    label="Quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                        setQuantity(e.target.value);
                    }}
                />
            </div>
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleAddButtonClick}
                >
                    {loading ? (
                        <CircularProgress />
                    ) : success ? (
                        <>
                            Successfully
                            <br />
                            Added<pre> </pre>
                            <DoneIcon />
                        </>
                    ) : (
                        <>
                            Add to Order <pre> </pre>
                            <AddShoppingCartIcon />
                        </>
                    )}
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
            <Suspense fallback="loading book">
                <CreateBook />
                <ViewBookForSaleContainer bookId={bookId} />
            </Suspense>
            <Reviews bookId={bookId} />
        </>
    );
}

import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import {useBookIdForBookForSaleIds} from '../../state/books/booksForSale';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import {useBookForSaleAtomFamily} from '../../state/books/booksForSale';
import {useBusinessUserAtomFamily} from '../../state/user/search/businessUser';

const useTableStyles = makeStyles({
    table: {
        minWidth: 300,
    },
});
export function SellerBookTable({bookId}) {
    const bookForSaleIds = useBookIdForBookForSaleIds(bookId);
    const styles = useTableStyles();
    return (
        <TableContainer component={Paper} className={styles.table}>
            <Table
                size="small"
                aria-label="Store books for sale"
                data-testid="bookforsaletable"
            >
                {bookForSaleIds ? (
                    <>
                        <TableHead>
                            <TableRow>
                                <TableCell>Seller</TableCell>
                                <TableCell align="right">
                                    Available Stock
                                </TableCell>
                                <TableCell align="right">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookForSaleIds.map((id) => (
                                <BookForSaleRow key={id} bookForSaleId={id} />
                            ))}
                        </TableBody>
                    </>
                ) : (
                    <></>
                )}
            </Table>
        </TableContainer>
    );
}

function BookForSaleRow({bookForSaleId}) {
    const row = useBookForSaleAtomFamily(bookForSaleId);
    const sellerInfo = useBusinessUserAtomFamily(row ? row.sellerId : null);
    if (row == null) return null;
    return (
        <TableRow key={row.id}>
            <TableCell
                component="th"
                scope="row"
                data-testid={'SBTName_bookId_' + row.bookKey}
            >
                <Link to={`/${row.sellerId}/book/${bookForSaleId}`}>
                    {sellerInfo
                        ? sellerInfo.fullName + ' ' + row.sellerId
                        : row.sellerId}
                </Link>
            </TableCell>
            <TableCell
                align="right"
                data-testid={'SBTStock_bookId' + row.bookKey}
            >
                {row.availableStock}
            </TableCell>
            <TableCell
                align="right"
                data-testid={'SBTPrice_bookId_' + row.bookKey}
            >
                ${String(row.sellPriceInCents / 100)}
            </TableCell>
        </TableRow>
    );
}

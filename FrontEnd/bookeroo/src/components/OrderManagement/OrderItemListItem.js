import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import React from 'react';

import {useBookForSaleAtomFamily} from '../../state/books/booksForSale';
import BookThumbnail from '../BookManagement/BookThumbnail';
import {Grid} from '@material-ui/core';

/**
 * Renders a ListItem containing information about an OrderItem. Allows for selection and checkbox.
 * @param {{item: object, checked: boolean, selected: boolean, onChange: ()=>void}} props The props for the ListItem
 * @returns
 */
export default function OrderItemListItem({
    item,
    checked = false,
    selected = false,
    onClick,
    ...props
}) {
    const bookForSale = useBookForSaleAtomFamily(item.bookForSaleId);
    return (
        <ListItem button selected={selected} onClick={onClick} dense>
            <ListItemIcon>
                <Checkbox
                    edge="start"
                    checked={checked}
                    disableRipple
                    color="primary"
                />
            </ListItemIcon>
            <ListItemText>
                <Grid container>
                    <Grid item xs={8}>
                        {bookForSale ? (
                            <BookThumbnail
                                bookId={bookForSale.bookId}
                            ></BookThumbnail>
                        ) : null}
                    </Grid>
                    <Grid item>
                        <Typography>QTY:</Typography>
                        <Typography>{item.quantity}</Typography>
                    </Grid>
                </Grid>
            </ListItemText>
            <ListItemSecondaryAction>
                <Typography>${(item.costInCents / 100).toFixed(2)}</Typography>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

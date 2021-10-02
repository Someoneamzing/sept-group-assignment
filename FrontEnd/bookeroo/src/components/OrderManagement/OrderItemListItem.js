import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import CheckBox from '@material-ui/icons/CheckBox';
import React from 'react';

import {useBookForSale} from '../../state/books/booksForSale';
import {bookAtomFamily} from '../../state/books/books';
import {useRecoilValue} from 'recoil';
import {idFromURL} from '../../state/utils';
import BookThumbnail from '../BookManagement/BookThumbnail';

/**
 * Renders a ListItem containing information about an OrderItem. Allows for selection and checkbox.
 * @param {{item: object, checked: boolean, selected: boolean, onChange: ()=>void}} props The props for the ListItem
 * @returns
 */
export default function OrderItemListItem({
    item,
    checked = false,
    selected = false,
    onChange,
    ...props
}) {
    const bookForSale = useBookForSale(item.bookForSaleId);
    return (
        <ListItem button selected={selected} onClick={onChange} dense>
            <ListItemIcon>
                <CheckBox edge="start" checked={checked} disableRipple />
            </ListItemIcon>
            <ListItemAvatar
                src=""
                alt={`Cover of the book ${item.bookForSaleId}`}
                variant="square"
            />
            <ListItemText>
                {bookForSale ? (
                    <BookThumbnail
                        bookId={idFromURL(bookForSale._links.book.href)}
                    ></BookThumbnail>
                ) : null}
            </ListItemText>
            <ListItemSecondaryAction>
                <Typography>${(item.costInCents / 100).toFixed(2)}</Typography>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

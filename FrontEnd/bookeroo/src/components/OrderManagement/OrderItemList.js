import React from 'react';
import List from '@material-ui/core/List';
import OrderItemListItem from './OrderItemListItem';
import {idFromURL} from '../../state/utils';

/**
 * Renders a list of order items with selection capabilities.
 * @param {{items: object[], selected: number[], onChange: ()=>void}} props The props of the OrderItemList
 * @returns
 */
export default function OrderItemList({items, selected, onChange, ...props}) {
    function handleListItemCheck(i) {
        console.log(`Click on: ${i}`);
        const toggle = selected.indexOf(i) < 0;
        onChange(toggle ? [...selected, i] : selected.filter((n) => n !== i));
    }
    return (
        <List>
            {items.map((item) => (
                <OrderItemListItem
                    key={item._links.self}
                    item={item}
                    checked={
                        (selected?.indexOf(idFromURL(item._links.self.href)) ??
                            -1) > -1
                    }
                    onClick={() =>
                        handleListItemCheck(idFromURL(item._links.self.href))
                    }
                />
            ))}
        </List>
    );
}

//TODO: Test selection behaviour works (toggle/disable, empty -> one, one -> empty, n -> n+1, n -> n-1)

import {Link} from 'react-router-dom';
import {useBookAtomFamily} from '../../state/books/books';
import {
    useBookIdForBookForSaleIds,
    useSearchBookForSalesQuery,
} from '../../state/books/booksForSale';
import React, {Suspense, useCallback, useMemo} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {SellerBookTable} from './SellerBookTable';
import {Button} from '@material-ui/core';
import {atom, useRecoilState} from 'recoil';

const useStyles = makeStyles((theme) => ({
    card: {
        marginBottom: '10px',
        display: 'flex',
        flexDirection: 'row',
    },
    root: {
        display: 'flex',
        position: 'relative',
        width: '100%',
    },
    media: {
        height: 'auto',
        maxWidth: '10%',
        width: '100%',
    },
    mediaExpand: {
        maxWidth: '23%',
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    expansion: {
        // position: 'absolute',
        // right: 20,
        // top: '50%',
        // transform: 'translateY(-50%)',
    },
    expand: {
        transform: 'rotate(-90deg)',
        marginLeft: 'auto',
    },
}));

const expandBookItemAtom = atom({
    key: 'expandLocalAtom',
    default: -1,
});
export default function BookListItem({bookId, expandAll}) {
    useSearchBookForSalesQuery(bookId, false);
    const [expandLocal, setExpand] = useRecoilState(expandBookItemAtom);
    const setExpandLocal = useCallback(() => {
        setExpand((x) => (x === bookId ? -1 : bookId));
    }, [setExpand, bookId]);
    const bookData = useBookAtomFamily(bookId);
    const classes = useStyles();
    const expanded = expandAll || expandLocal === bookId;
    const date = useMemo(
        () => new Date(bookData.publishDate).toDateString(),
        [bookData.publishDate]
    );

    return (
        <Card className={classes.card}>
            <CardMedia
                className={clsx(classes.media, {
                    [classes.mediaExpand]: expanded,
                })}
                image={bookData.coverArtURL}
                title="Book Cover"
            />{' '}
            <div style={{display: 'block', width: '100%'}}>
                <div className={classes.root}>
                    <CardContent className={classes.content} align="left">
                        <div>
                            <Link to={`/book/${bookId}`}>
                                <Typography component="h6" variant="body1">
                                    {bookData.bookTitle}
                                </Typography>
                            </Link>
                            <div
                                style={{display: 'flex', flexDirection: 'row'}}
                            >
                                <Typography
                                    variant="body2"
                                    color="textPrimary"
                                    // style={{marginRight: '10px'}}
                                >
                                    {bookData.author}
                                </Typography>
                                <span style={{margin: '0 5px'}}>•</span>
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    component="p"
                                >
                                    {date.split(' ').pop()}
                                </Typography>
                            </div>
                            <Button
                                style={{textTransform: 'none'}}
                                onClick={setExpandLocal}
                            >
                                <BookForSaleStoreCount bookId={bookId} />
                            </Button>
                        </div>
                        <div className={classes.expansion}>
                            <Link to={`/book/${bookId}`}>
                                <IconButton
                                    className={classes.expand}
                                    aria-expanded={expanded}
                                    aria-label="Go"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </Link>
                        </div>
                    </CardContent>
                </div>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Suspense fallback="Loading Sellers">
                        <SellerBookTable bookId={bookId} />
                    </Suspense>
                </Collapse>
            </div>
        </Card>
    );
}

function BookForSaleStoreCount({bookId}) {
    const fsIds = useBookIdForBookForSaleIds(bookId);
    return (
        <Typography
            variant="body2"
            color={fsIds.length ? 'textPrimary' : 'textSecondary'}
            component="p"
        >
            {fsIds.length
                ? fsIds.length + ' Store' + (fsIds.length > 1 ? 's' : '')
                : 'Unavailable'}
        </Typography>
    );
}

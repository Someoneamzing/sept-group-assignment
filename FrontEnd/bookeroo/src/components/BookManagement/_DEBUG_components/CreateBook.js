import React from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';

export default function CreateBook() {
    const createBook = async () => {
        const a = await fetch('/bookcover.txt');
        const b = await a.blob();
        const text = await b.text();

        const data = JSON.stringify({
            bookTitle: 'One Night The Moon',
            author: 'James Humphry',
            publisher: 'Penguin',
            publishDate: '2002-08-12',
            isbn: 'i38756245879',
            coverArtURL: text,
            tableOfContents: 'Chapter1\nChapter2\nChapter3\n',
        });
        let config = {
            method: 'post',
            url: 'http://localhost:8081/api/books',
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };
        try {
            const res = await axios(config);
            console.log(res.data);
            const bookForSale = JSON.stringify({
                book: new URL(res.data._links.book.href).pathname,
                sellerId: 5,
                availableStock: 5,
                sellPriceInCents: 55555,
            });
            config.data = bookForSale;
            config.url = 'http://localhost:8081/api/bookForSales';
            const bfsRes = await axios(config);
            console.log(bfsRes);
            alert(`check console for book`);
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <Button variant="contained" color="secondary" onClick={createBook}>
            (DEV ONLY) create another book
        </Button>
    );
}

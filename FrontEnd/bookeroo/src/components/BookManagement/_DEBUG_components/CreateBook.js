import React, {useState} from 'react';
import axios from 'axios';
import {Button} from '@material-ui/core';
import {BOOK_MS_ENDPOINT} from '../../../env-vars';

let CreateBookExport;

if (process.env.NODE_END === 'production') {
    CreateBookExport = () => <></>;
} else {
    const {
        uniqueNamesGenerator,
        adjectives,
        colors,
        names,
        animals,
        starWars,
    } = require('unique-names-generator');

    const authorConfig = {
        dictionaries: [names, names],
        separator: ' ',
        style: 'capital',
    };

    const publisherConfig = {
        dictionaries: [adjectives, names],
        separator: ' ',
        style: 'capital',
    };

    const sellerIds = [1, 2, 3, 4];

    const uniqueDate = () => {
        const dt = new Date(Math.random() * Date.now());
        const month = String(dt.getMonth() + 1).padStart(2, '0');
        const date = String(dt.getDate()).padStart(2, '0');
        return `${dt.getFullYear()}-${month}-${date}`;
    };

    const createBook = async (bookName) => {
        const a = await fetch('/bookcover.txt');
        const b = await a.blob();
        const text = await b.text();
        const data = JSON.stringify({
            bookTitle: bookName,
            author: uniqueNamesGenerator(authorConfig),
            publisher: uniqueNamesGenerator(publisherConfig),
            publishDate: uniqueDate(),
            isbn: `${Math.random().toString().substr(2)}`,
            coverArtURL: text,
            tableOfContents: 'Chapter1\nChapter2\nChapter3\n',
        });
        let config = {
            method: 'post',
            url: `http://${BOOK_MS_ENDPOINT}/api/books`,
            headers: {
                'Content-Type': 'application/json',
            },
            data,
        };
        try {
            const res = await axios(config);
            console.log(res.data);
            const queue = [...sellerIds]
                .sort(() => Math.random() - 0.5)
                .slice(0, Math.random() * sellerIds.length + 0.5);
            for (let sellerId of queue) {
                const bookForSale = JSON.stringify({
                    book: new URL(res.data._links.book.href).pathname,
                    sellerId: sellerId,
                    availableStock: Math.floor(Math.random() * 77),
                    sellPriceInCents: Math.floor(Math.random() * 100000),
                });
                config.data = bookForSale;
                config.url = `http://${BOOK_MS_ENDPOINT}/api/bookForSales`;
                const bfsRes = await axios(config);
                console.log(bfsRes);
            }
        } catch (e) {
            console.log(e);
        }
    };

    function CreateBook({reload}) {
        const [, refreshRaw] = useState(1);
        const refresh = () => refreshRaw((x) => x + 1);
        const bookName = uniqueNamesGenerator({
            dictionaries: [adjectives, names, animals, colors, starWars].sort(
                () => Math.random() - 0.5
            ),
            separator: ' ',
            style: 'capital',
            length: Math.floor(Math.random() * 5 + 1),
        });

        return (
            <>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => createBook(bookName).then(reload)}
                >
                    (DEV ONLY) create book '{bookName}'
                </Button>
                <br></br>
                <Button onClick={refresh}>🔃</Button>
            </>
        );
    }

    CreateBookExport = CreateBook;
}

export default CreateBookExport;

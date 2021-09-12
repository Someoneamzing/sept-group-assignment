import React from 'react';
import './BookThumbnail.css';

export default function BookThumbnail({book, ...props}) {
    return (
        <div className="BookThumbnail">
            <img
                src={book.coverArtURL}
                alt={`Cover Art for ${book.bookTitle}.`}
                className="BookThumbnail-cover-art"
            />
            <p className="BookThumbnail-title">{book.bookTitle}</p>
            <small>
                {book.author} - {book.publisher}
            </small>
        </div>
    );
}

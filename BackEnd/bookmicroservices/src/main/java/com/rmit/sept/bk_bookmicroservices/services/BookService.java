package com.rmit.sept.bk_bookmicroservices.services;

import com.rmit.sept.bk_bookmicroservices.model.Book;
import com.rmit.sept.bk_bookmicroservices.repositories.BookForSaleRepository;
import com.rmit.sept.bk_bookmicroservices.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final BookForSaleRepository bookForSaleRepository;

    @Autowired
    public BookService(BookRepository bookRepository, BookForSaleRepository bookForSaleRepository) {
        this.bookRepository = bookRepository;
        this.bookForSaleRepository = bookForSaleRepository;
    }


}

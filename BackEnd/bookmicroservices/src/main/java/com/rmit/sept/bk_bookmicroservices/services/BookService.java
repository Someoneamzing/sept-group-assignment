package com.rmit.sept.bk_bookmicroservices.services;

import com.rmit.sept.bk_bookmicroservices.model.Book;
import com.rmit.sept.bk_bookmicroservices.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public Book saveBook(Book newBook){
        return bookRepository.save(newBook);
    }
}

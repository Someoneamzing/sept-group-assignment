package com.rmit.sept.bk_bookmicroservices.services;

import com.rmit.sept.bk_bookmicroservices.model.Book;
import com.rmit.sept.bk_bookmicroservices.repositories.BookForSaleRepository;
import com.rmit.sept.bk_bookmicroservices.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import static com.rmit.sept.bk_bookmicroservices.MsBooks.LOGGER;

import java.util.List;

@Service
/**
 * The service for implementing the business logic of Books.
 * @note Unused at the moment but left here as it is soon to be used in future features.
 */
public class BookService {

    private final BookRepository bookRepository;
    private final BookForSaleRepository bookForSaleRepository;

    @Autowired
    public BookService(BookRepository bookRepository, BookForSaleRepository bookForSaleRepository) {
        this.bookRepository = bookRepository;
        this.bookForSaleRepository = bookForSaleRepository;
    }

    public List<Book> getAllBooks(){
        return bookRepository.findAll();
    }

    public List<String> getAllCategories(){
        return bookRepository.findAllCategories();
    }

    public List<Book> getBookByGenre(String genre){
        return bookRepository.findAllByGenre(genre);
    }

}

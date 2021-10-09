package com.rmit.sept.bk_bookmicroservices.web;

import com.rmit.sept.bk_bookmicroservices.repositories.BookRepository;
import com.rmit.sept.bk_bookmicroservices.services.BookService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * Unused controller used as a placeholder for future behaviour.
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @RequestMapping("/filterPage")
    public ResponseEntity<?> filterPage(){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("Genres", bookService.getAllCategories());
        jsonObject.put("Books", bookService.getAllBooks());
        return new ResponseEntity<>(jsonObject, HttpStatus.OK);
    }

    @RequestMapping("/deleteAll")
    public void deleteAll(){
        bookRepository.deleteAll();
    }
}

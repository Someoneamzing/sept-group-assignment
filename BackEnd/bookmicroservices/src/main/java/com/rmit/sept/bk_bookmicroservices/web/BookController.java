package com.rmit.sept.bk_bookmicroservices.web;

import com.rmit.sept.bk_bookmicroservices.repositories.BookRepository;
import com.rmit.sept.bk_bookmicroservices.services.BookService;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/books")
public class BookController {

    @SuppressWarnings("SpringElInspection")
    @Value("#{environment.CIRCLE_BRANCH_SHA1}")
    private String branchSha1;
    @GetMapping("/version")
    public String version() {
        return branchSha1;
    }

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;

    @RequestMapping("/filter")
    public ResponseEntity<?> filteredBooks(@RequestParam(name="genre") String genre){
        JSONObject jsonObject = new JSONObject();
        if (genre.equals("all")){
            jsonObject.put("Books", bookService.getAllBooks());
        } else {
            jsonObject.put("Books", bookService.getBookByGenre(genre));
        }
        jsonObject.put("Genres", bookService.getAllCategories());
        return new ResponseEntity<>(jsonObject, HttpStatus.OK);
    }

    @RequestMapping("/deleteAll")
    public void deleteAll(){
        bookRepository.deleteAll();
    }
}

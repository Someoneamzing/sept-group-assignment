package com.rmit.sept.bk_bookmicroservices.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
        LOGGER.trace(String.format("Filtering all books by genre '%s'.", genre));
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
        LOGGER.trace("Deleting all books.");
        bookRepository.deleteAll();
    }
}

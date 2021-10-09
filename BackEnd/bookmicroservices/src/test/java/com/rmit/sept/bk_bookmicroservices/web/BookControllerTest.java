package com.rmit.sept.bk_bookmicroservices.web;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.bk_bookmicroservices.model.Book;
import com.rmit.sept.bk_bookmicroservices.repositories.BookRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

import java.util.Date;
import java.util.List;

@AutoConfigureMockMvc
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
public class BookControllerTest {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper oMap;

    private Date test_date = new Date();

    private List<Book> test_books;

//    @BeforeEach
//    void beforeEach() {
//        bookRepository.deleteAll();
//        bookRepository.flush();
//        // Initialise a list of test books.
//        test_books = List.of(new Book []{
//                new Book("book1", "author1", "publisher1", test_date, "1234567", "data:image/png;base64,abcdefghijklmno",  "-Chapter 1\n- Chapter 2"),
//                new Book("book2", "author2", "publisher2", test_date, "1234567", "data:image/png;base64,abcdefghijklmno",  "-Chapter 1\n- Chapter 2"),
//                new Book("book3", "author3", "publisher3", test_date, "1234567", "data:image/png;base64,abcdefghijklmno",  "-Chapter 1\n- Chapter 2"),
//        });
////        test_books.get(0).setId(0L);
////        test_books.get(1).setId(2L);
////        test_books.get(2).setId(3L);
//        bookRepository.saveAllAndFlush(test_books);
//    }

    @AfterEach
    void afterEach() {
        bookRepository.deleteAll();
    }

    @Test
    void listAllEndpointSuccessfullyResponds() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/books")).andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith("application/hal+json"))
                .andExpect(jsonPath("$._embedded.books.length()", is(3)))
                .andExpect(jsonPath("$._embedded.books[0].bookTitle", is("book1")))
                .andExpect(jsonPath("$._embedded.books[1].bookTitle", is("book2")))
                .andExpect(jsonPath("$._embedded.books[2].bookTitle", is("book3")))
                .andReturn();
    }

    @Test
    void getOneEndpointSuccessfullyResponds() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/books/" + test_books.get(0).getId())).andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith("application/hal+json"))
                .andExpect(jsonPath("$.bookTitle", is("book1")))
                .andExpect(jsonPath("$.author", is("author1")))
                .andExpect(jsonPath("$.publisher", is("publisher1")))
                .andExpect(jsonPath("$.publishDate", is(oMap.writeValueAsString(test_date).replaceAll("^\"|\"$", ""))))
                .andExpect(jsonPath("$.isbn", is("1234567")))
                .andExpect(jsonPath("$.tableOfContents", is("-Chapter 1\n- Chapter 2")))
                .andExpect(jsonPath("$.coverArtURL", is("data:image/png;base64,abcdefghijklmno")))
                .andReturn();
    }

    @Test
    void getOneEndpointRespondsWithErrorOnUnknownId() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/books/5")).andExpect(status().isNotFound()).andReturn();
    }

    @Test
    void createEndpointSuccessfullyResponds() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/books").content("{\"bookTitle\": \"book4\",\"author\": \"author4\", \"publisher\":\"publisher4\",\"publishDate\":\"2020-09-09\",\"isbn\":\"1234567\",\"coverArtURL\":\"data:image/png;base64,abcdefghijklmno\",\"tableOfContents\":\"-Chapter 1\\n- Chapter 2\"}")).andExpect(status().isCreated()).andExpect(redirectedUrlPattern("http://*/api/books/*"))
                .andReturn();
    }

    @Test
    void createEndpointRespondsWithErrorOnInvalidData() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/books").content("{}")).andExpect(status().isBadRequest()).andExpect(content().contentTypeCompatibleWith("application/json"))
                .andReturn();
    }
}

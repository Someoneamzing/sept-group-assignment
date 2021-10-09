package com.rmit.sept.bk_bookmicroservices.web;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.bk_bookmicroservices.model.Book;
import com.rmit.sept.bk_bookmicroservices.model.BookForSale;
import com.rmit.sept.bk_bookmicroservices.repositories.BookForSaleRepository;
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
public class BookForSaleControllerTest {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookForSaleRepository bookForSaleRepository;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper oMap;

    private Date test_date = new Date();

    private List<Book> test_books;
    private List<BookForSale> test_book_for_sales;

//    @BeforeEach
//    void beforeEach() {
//        bookForSaleRepository.deleteAll();
//        bookForSaleRepository.flush();
//        bookRepository.deleteAll();
//        bookRepository.flush();
//
//
//        // Initialise a list of test books.
//        test_books = List.of(new Book []{
//                new Book("book1", "author1", "publisher1", test_date, "1234567", "data:image/png;base64,abcdefghijklmno",  "-Chapter 1\n- Chapter 2"),
//                new Book("book2", "author2", "publisher2", test_date, "1234567", "data:image/png;base64,abcdefghijklmno",  "-Chapter 1\n- Chapter 2"),
//                new Book("book3", "author3", "publisher3", test_date, "1234567", "data:image/png;base64,abcdefghijklmno",  "-Chapter 1\n- Chapter 2")
//        });
////        test_books.get(0).setId(0L);
////        test_books.get(1).setId(2L);
////        test_books.get(2).setId(3L);
//        bookRepository.saveAllAndFlush(test_books);
//        test_book_for_sales = List.of(new BookForSale[]{
//                new BookForSale(test_books.get(0), 0L, 10, 10000),
//                new BookForSale(test_books.get(1), 1L, 20, 20000),
//                new BookForSale(test_books.get(2), 2L, 30, 30000),
//        });
////        test_book_for_sales.get(0).setId(1L);
////        test_book_for_sales.get(1).setId(2L);
////        test_book_for_sales.get(2).setId(3L);
//        bookForSaleRepository.saveAllAndFlush(test_book_for_sales);
//    }

    @AfterEach
    void afterEach() {
        bookForSaleRepository.deleteAll();
        bookRepository.deleteAll();
    }

    @Test
    void listEndpointSuccessfullyResponds() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/bookForSales")).andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith("application/hal+json"))
                .andExpect(jsonPath("$._embedded.bookForSales.length()", is(3)))
                .andExpect(jsonPath("$._embedded.bookForSales[0].sellerId", is(0)))
                .andExpect(jsonPath("$._embedded.bookForSales[1].sellerId", is(1)))
                .andExpect(jsonPath("$._embedded.bookForSales[2].sellerId", is(2)))
                .andReturn();
    }

    @Test
    void getOneEndpointSuccessfullyResponds() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/bookForSales/" + test_book_for_sales.get(0).getId())).andExpect(status().isOk()).andExpect(content().contentTypeCompatibleWith("application/hal+json"))
                .andExpect(jsonPath("$.sellerId", is(0)))
                .andExpect(jsonPath("$.availableStock", is(10)))
                .andExpect(jsonPath("$.sellPriceInCents", is(10000)))
                .andReturn();
    }

    @Test
    void getOneEndpointRespondsWithErrorOnUnknownId() throws Exception {
        MvcResult result = mockMvc.perform(get("/api/bookForSales/5")).andExpect(status().isNotFound()).andReturn();
    }

    @Test
    void createEndpointSuccessfullyResponds() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/bookForSales").content("{\"book\":\"http://localhost:8081/api/books/" + test_books.get(2).getId() + "\", \"sellerId\": 3, \"availableStock\":40, \"sellPriceInCents\": 40000}")).andExpect(status().isCreated()).andExpect(redirectedUrlPattern("http://*/api/bookForSales/*"))
                .andReturn();
    }

    @Test
    void createEndpointRespondsWithErrorOnInvalidData() throws Exception {
        MvcResult result = mockMvc.perform(post("/api/bookForSales").content("{}")).andExpect(status().isBadRequest()).andExpect(content().contentTypeCompatibleWith("application/json"))
                .andReturn();
    }
}

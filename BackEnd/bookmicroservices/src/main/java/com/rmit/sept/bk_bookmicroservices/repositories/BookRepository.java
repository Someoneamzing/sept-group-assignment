package com.rmit.sept.bk_bookmicroservices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rmit.sept.bk_bookmicroservices.model.Book;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
/**
 * The Repository storing Books. Standard exposure of CRUD operations from Spring Data REST
 */
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("SELECT b FROM Book b WHERE lower(b.genre) = lower(:genre)")
    List<Book> findAllByGenre(@Param("genre") String genre);

    @Query("SELECT DISTINCT genre FROM Book")
    List<String> findAllCategories();
}

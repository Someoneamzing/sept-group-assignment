package com.rmit.sept.bk_bookmicroservices.repositories;

import org.springframework.data.repository.CrudRepository;
import com.rmit.sept.bk_bookmicroservices.model.Book;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {

        Book getById(Long id);
}

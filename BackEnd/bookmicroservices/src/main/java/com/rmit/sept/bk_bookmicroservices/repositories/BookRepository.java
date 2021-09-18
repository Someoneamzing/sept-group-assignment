package com.rmit.sept.bk_bookmicroservices.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.rmit.sept.bk_bookmicroservices.model.Book;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

}

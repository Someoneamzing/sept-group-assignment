package com.rmit.sept.bk_bookmicroservices.repositories;

import com.rmit.sept.bk_bookmicroservices.model.BookForSale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BookForSaleRepository extends JpaRepository<BookForSale, Long> {
    List<BookForSale> getBooksForSaleBySellerId(Long sellerId);
}

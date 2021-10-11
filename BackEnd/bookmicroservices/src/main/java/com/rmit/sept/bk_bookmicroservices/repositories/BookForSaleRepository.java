package com.rmit.sept.bk_bookmicroservices.repositories;

import com.rmit.sept.bk_bookmicroservices.model.BookForSale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
/**
 * The repository for storing BookForSales. Exposes all the default CRUD operations from Spring Data REST
 */
public interface BookForSaleRepository extends JpaRepository<BookForSale, Long> {
    List<BookForSale> getBooksForSaleBySellerId(Long sellerId);
    void getBookForSaleBySellerIdIn(List<Long> sellerIds);
    List<BookForSale> findAllByBook_Id(Long bookId);
}

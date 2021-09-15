package com.rmit.sept.bk_bookmicroservices.model;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.constraints.PositiveOrZero;
import java.util.Date;

@SQLDelete(sql = "UPDATE booksforsale SET deleted=TRUE WHERE id=?")
@Entity
@Table(name="booksforsale")
@Where(clause = "deleted = false")
/**
 * Represents details about a book that has been put up for sale. Includes price, seller and quantity information.
 */
public class BookForSale extends ServiceEntity {

    @JoinColumn(nullable = false)
    @ManyToOne(optional = false)
    @NotNull
    // The book that is for sale
    private Book book;

    @Column(nullable = false)
    @NotNull
    // The user id of the seller
    private Long sellerId;

    // The amount of stock the seller has available
    @PositiveOrZero
    private int availableStock;

    // The sale price of the book. Is in cents for precision reasons
    @Positive
    private int sellPriceInCents;

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public int getAvailableStock() {
        return availableStock;
    }

    public void setAvailableStock(int availableStock) {
        this.availableStock = availableStock;
    }

    public int getSellPriceInCents() {
        return sellPriceInCents;
    }

    public void setSellPriceInCents(int sellPriceInCents) {
        this.sellPriceInCents = sellPriceInCents;
    }
}

package com.rmit.sept.bk_bookmicroservices.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookId;

    private String bookName;
    private double bookPrice;
    private int book_stocks;
    private String author;
    private String ISBN;


    private Date create_At;
    private Date update_At;

    public Book(){}

}

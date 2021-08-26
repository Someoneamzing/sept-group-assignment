package com.rmit.sept.bk_bookmicroservices.model;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.URL;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.Date;

@SQLDelete(sql = "UPDATE books SET deleted=TRUE WHERE id=?")
@Entity
@Table(name="books")
@Where(clause = "deleted = false")
public class Book extends ServiceEntity {


    @NotBlank(message = "Title must not be blank.")
    private String bookTitle;
    @NotBlank(message= "Author must not be blank.")
    private String author;
    @NotBlank(message= "publisher must not be blank.")
    private String publisher;
    @NotNull(message= "Author must not be blank.")
    private Date publishDate;
    @NotBlank(message = "ISBN must not be blank.")
    private String ISBN;
    @NotBlank(message = "Cover Art must be provided")
    @Lob
    @Pattern(message = "Cover Art must be a valid Data URI", regexp = "^data:(\\w+/[-+.\\w]+)?(;base64),[a-zA-Z0-9\\+/]*={0,3}$")
    @Column(name="cover_art_url", columnDefinition = "CLOB")
    private String coverArtURL;
    @NotBlank(message = "Table of contents must be provided")
    private String tableOfContents;

    public Book(){}

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public String getCoverArtURL() {
        return coverArtURL;
    }

    public void setCoverArtURL(String coverArtURL) {
        this.coverArtURL = coverArtURL;
    }

    public String getTableOfContents() {
        return tableOfContents;
    }

    public void setTableOfContents(String tableOfContents) {
        this.tableOfContents = tableOfContents;
    }


}
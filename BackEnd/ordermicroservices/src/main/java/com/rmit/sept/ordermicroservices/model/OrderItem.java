package com.rmit.sept.ordermicroservices.model;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;

@SQLDelete(sql = "UPDATE order_items SET deleted=TRUE WHERE id=?")
@Entity
@Table(name="order_items")
@Where(clause = "deleted = false")
public class OrderItem extends ServiceEntity {
    @ManyToOne
    Order order;
    @NotNull
    private long bookForSaleId;
    @NotNull
    @Positive
    private int quantity;
    @NotNull
    @Positive
    private int costInCents;

    public Order getOrder() {
        return order;
    }

    public Long getOrderId() {
        return order.getId();
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public long getBookForSaleId() {
        return bookForSaleId;
    }

    public void setBookForSaleId(long bookForSaleId) {
        this.bookForSaleId = bookForSaleId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getCostInCents() {
        return costInCents;
    }

    public void setCostInCents(int costInCents) {
        this.costInCents = costInCents;
    }
}

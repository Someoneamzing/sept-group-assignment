package com.rmit.sept.ordermicroservices.model;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@SQLDelete(sql = "UPDATE orders SET deleted=TRUE WHERE id=?")
@Entity
@Table(name="orders")
@Where(clause = "deleted = false")
public class Order extends ServiceEntity {
    @OneToMany(mappedBy = "order")
    private List<OrderItem> items;
    @NotNull
    private long userId;
    @Enumerated(EnumType.STRING)
    @NotNull
    private OrderStatus status;

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public OrderStatus getStatus() {
        return status;
    }
}

package com.rmit.sept.ordermicroservices.services;

import com.rmit.sept.ordermicroservices.model.Order;
import com.rmit.sept.ordermicroservices.model.OrderItem;
import com.rmit.sept.ordermicroservices.model.OrderStatus;
import com.rmit.sept.ordermicroservices.repositories.OrderItemRepository;
import com.rmit.sept.ordermicroservices.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {
    private OrderRepository orderRepository;
    private OrderItemRepository orderItemRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, OrderItemRepository orderItemRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    /**
     * Retrieves the users current order creating one if it does not exist.
     * @param userId The ID of the user
     * @return The created/retrieved order
     * @throws IllegalStateException Throws if it finds multiple "current" orders for the user. This should never happen and in tha ces it does this algorithm has no resolution. Thus, it throws.
     */
    public Order getCurrentOrderForUser(long userId) {
        List<Order> orders = orderRepository.findByUserIdAndStatus(userId, OrderStatus.CURRENT);
        if (orders.size() > 1) throw new IllegalStateException("Found multiple orders with status: current for one user. This should never happen.");
        Order currentOrder;
        if (orders.size() == 1) {
            currentOrder = orders.get(0);
        } else {
            currentOrder = new Order(userId);
            orderRepository.save(currentOrder);
        }
        return currentOrder;
    }

    public OrderItem addOrderItemToCurrentOrderForUser(long userId, OrderItem item) {
        Order order = getCurrentOrderForUser(userId);
        item.setOrder(order);
        orderItemRepository.save(item);
        return item;
    }
}

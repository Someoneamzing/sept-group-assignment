package com.rmit.sept.ordermicroservices.web;

import com.rmit.sept.ordermicroservices.model.Order;
import com.rmit.sept.ordermicroservices.model.OrderItem;
import com.rmit.sept.ordermicroservices.security.UserDetails;
import com.rmit.sept.ordermicroservices.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController()
@RequestMapping("/items")

public class OrderItemController {
    OrderService orderService;

    @Autowired
    public OrderItemController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/")
    public ResponseEntity<OrderItem> createOrderItem(@Valid OrderItem orderItem, Authentication authentication) {
        UserDetails userDetails = (UserDetails)authentication.getPrincipal();
        orderService.addOrderItemToCurrentOrderForUser(userDetails.getUserId(), orderItem);
        return ResponseEntity.ok(orderItem);
    }
}

package com.rmit.sept.ordermicroservices.web;

import com.rmit.sept.ordermicroservices.model.Order;
import com.rmit.sept.ordermicroservices.model.OrderStatus;
import com.rmit.sept.ordermicroservices.repositories.OrderRepository;
import com.rmit.sept.ordermicroservices.security.UserDetails;
import com.rmit.sept.ordermicroservices.services.OrderService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.context.support.WithSecurityContext;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

import java.util.List;

@AutoConfigureMockMvc
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
public class OrderControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private OrderRepository orderRepository;

    private List<Order> order_list;

    @BeforeEach
    public void initialise() {
        orderRepository.deleteAll();
        order_list = List.of(
                new Order(1, OrderStatus.CURRENT),
                new Order(1, OrderStatus.PENDING),
                new Order(1, OrderStatus.PAID),
                new Order(1, OrderStatus.RECEIVED),
                new Order(2, OrderStatus.CURRENT),
                new Order(2, OrderStatus.PENDING),
                new Order(2, OrderStatus.PAID),
                new Order(2, OrderStatus.RECEIVED)
        );
        orderRepository.saveAll(order_list);
    }

    @AfterEach
    void afterEach() {
        orderRepository.deleteAll();
    }

    @Test
    @WithMockCustomUserDetails(userId = 1)
    public void currentEndpointRespondsWithProperOrderForUser1() throws Exception {
        mockMvc.perform(get("/api/orders/current").header("Host", "http://localhost:8082"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith("application/hal+json"))
                .andExpect(jsonPath("$.id", is((int)(long)order_list.get(0).getId())))
                .andExpect(jsonPath("$.userId", is(1)))
                .andExpect(jsonPath("$.status", is("CURRENT")))
                .andReturn()
        ;
    }

    @Test
    @WithMockCustomUserDetails(userId = 2)
    public void currentEndpointRespondsWithProperOrderForUser2() throws Exception {
        mockMvc.perform(get("/api/orders/current").header("Host", "http://localhost:8082"))
                .andExpect(status().isOk())
                .andExpect(content().contentTypeCompatibleWith("application/hal+json"))
                .andExpect(jsonPath("$.id", is((int)(long)order_list.get(4).getId())))
                .andExpect(jsonPath("$.userId", is(2)))
                .andExpect(jsonPath("$.status", is("CURRENT")))
                .andReturn()
        ;
    }
}

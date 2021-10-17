package com.rmit.sept.ordermicroservices.web;

import com.rmit.sept.ordermicroservices.model.Order;
import com.rmit.sept.ordermicroservices.model.OrderItem;
import com.rmit.sept.ordermicroservices.model.OrderStatus;
import com.rmit.sept.ordermicroservices.repositories.OrderRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@ActiveProfiles("test")
public class OrderItemControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private OrderRepository orderItemRepository;

    @AfterEach
    void afterEach() {
        orderItemRepository.deleteAll();
    }

    @Test
    @WithMockCustomUserDetails(userId = 1)
    public void postEndpointSuccessfullyCreatesItemInCurrentOrder() throws Exception {
        String body = "{\"costInCents\": 10000, \"quantity\": 10, \"bookForSaleId\": 1}";
        mockMvc.perform(post("/api/items").header("Host", "http://localhost:8082").content(body))
                .andExpect(status().isCreated())
                .andReturn()
        ;
    }

    @Test
    @WithMockCustomUserDetails(userId = 1)
    public void postEndpointFailsWithInvalidItem() throws Exception {
        String body = "{}";
        mockMvc.perform(post("/api/items").header("Host", "http://localhost:8082").content(body))
                .andExpect(status().isBadRequest())
                .andReturn()
        ;
    }
}

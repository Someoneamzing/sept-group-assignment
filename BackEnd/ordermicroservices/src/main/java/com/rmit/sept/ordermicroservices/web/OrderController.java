package com.rmit.sept.ordermicroservices.web;

import com.rmit.sept.ordermicroservices.model.Order;
import com.rmit.sept.ordermicroservices.security.UserDetails;
import com.rmit.sept.ordermicroservices.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.Link;
import org.springframework.hateoas.LinkRelation;
import org.springframework.hateoas.RepresentationModel;
import org.springframework.hateoas.mediatype.hal.HalModelBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

@RepositoryRestController()
@RequestMapping("/api/orders")
public class OrderController {

    OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @RequestMapping(method = RequestMethod.GET, value="/current")
    public ResponseEntity<?> getCurrentOrder(@RequestHeader String host, Authentication authentication) throws URISyntaxException {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Order order = orderService.getCurrentOrderForUser(userDetails.getUserId());
        EntityModel<Order> model = EntityModel.of(order);
        // Add the links to match the REST response.
        String itemPath = String.format("http://%s/api/orders/%s", host, order.getId());
        model.add(Link.of(itemPath).withRel(LinkRelation.of("self" )));
        model.add(Link.of(itemPath).withRel(LinkRelation.of("order")));
        model.add(Link.of(itemPath + "/items").withRel(LinkRelation.of("items")));

        return ResponseEntity.ok(model);
    }
}

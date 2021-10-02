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
        model.add(Link.of(new URI("http:", host,"/api/orders/{id}",       null).toString()).withRel(LinkRelation.of("self" )).expand(order.getId()));
        model.add(Link.of(new URI("http:", host,"/api/orders/{id}",       null).toString()).withRel(LinkRelation.of("order")).expand(order.getId()));
        model.add(Link.of(new URI("http:", host,"/api/orders/{id}/items", null).toString()).withRel(LinkRelation.of("items")).expand(order.getId()));

        return ResponseEntity.ok(model);
    }
}

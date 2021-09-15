package com.rmit.sept.ordermicroservices.repositories;

import com.rmit.sept.ordermicroservices.model.Order;
import com.rmit.sept.ordermicroservices.model.OrderItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

/**
 * This repository is purely for internal use and should not be exposed directly. As such the `exposed` config has been set to false.
 * As of now this repository contains only the standard CRUD operations provided by Spring Data REST.
 */
@RepositoryRestResource(exported = false)
public interface OrderItemRepository extends CrudRepository<OrderItem, Long> {
    //TODO: Hide the getAll endpoint but leave the new,byId and delete endpoints
}

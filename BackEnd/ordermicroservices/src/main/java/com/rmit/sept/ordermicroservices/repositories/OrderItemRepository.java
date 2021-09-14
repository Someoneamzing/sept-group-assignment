package com.rmit.sept.ordermicroservices.repositories;

import com.rmit.sept.ordermicroservices.model.Order;
import com.rmit.sept.ordermicroservices.model.OrderItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

//@RepositoryRestResource(exported = false)
public interface OrderItemRepository extends CrudRepository<OrderItem, Long> {
    //TODO: Hide the getAll endpoint but leave the new, byId and delete endpoints
}

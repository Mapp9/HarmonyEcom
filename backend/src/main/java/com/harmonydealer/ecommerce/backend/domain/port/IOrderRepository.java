package com.harmonydealer.ecommerce.backend.domain.port;

import com.harmonydealer.ecommerce.backend.domain.model.Order;

import java.util.List;

public interface IOrderRepository {
    Order save (Order order);
    Order findById(Integer id);
    Iterable<Order> findAll();
    Iterable<Order> findByUserId(Integer userId);
    void updateStateById(Integer id, String state);
    List<Object[]> getSalesByDay();
    List<Object[]> getSalesByMonth();
    List<Object[]> getSalesByYear();
    List<Object[]> getTopSellingProducts();
}

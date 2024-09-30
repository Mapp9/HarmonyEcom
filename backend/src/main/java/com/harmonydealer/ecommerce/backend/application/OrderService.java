package com.harmonydealer.ecommerce.backend.application;

import com.harmonydealer.ecommerce.backend.domain.model.Order;
import com.harmonydealer.ecommerce.backend.domain.port.IOrderRepository;
import lombok.AllArgsConstructor;

import java.util.List;

@AllArgsConstructor
public class OrderService {

    private final IOrderRepository iOrderRepository;

    public Order save (Order order){
        return this.iOrderRepository.save(order);
    }
    public Iterable<Order> findAll(){
        return this.iOrderRepository.findAll();
    }
    public Order findById(Integer id){
        return this.iOrderRepository.findById(id);
    }
    public Iterable<Order> findByUserId(Integer userId){
        return this.iOrderRepository.findByUserId(userId);
    }
    public void updateStateById(Integer id, String state){
        this.iOrderRepository.updateStateById(id, state);
    }

    public List<Object[]> getSalesByDay() {
        return iOrderRepository.getSalesByDay();
    }

    public List<Object[]> getSalesByMonth() {
        return iOrderRepository.getSalesByMonth();
    }

    public List<Object[]> getSalesByYear() {
        return iOrderRepository.getSalesByYear();
    }

    public List<Object[]> getTopSellingProducts() {
        return iOrderRepository.getTopSellingProducts();
    }
}

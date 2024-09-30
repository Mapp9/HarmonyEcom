package com.harmonydealer.ecommerce.backend.infrastructure.adapter;

import com.harmonydealer.ecommerce.backend.domain.model.Order;
import com.harmonydealer.ecommerce.backend.domain.model.OrderState;
import com.harmonydealer.ecommerce.backend.domain.port.IOrderRepository;
import com.harmonydealer.ecommerce.backend.infrastructure.entity.OrderEntity;
import com.harmonydealer.ecommerce.backend.infrastructure.entity.UserEntity;
import com.harmonydealer.ecommerce.backend.infrastructure.mapper.IOrderMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@AllArgsConstructor
public class OrderCrudRepositoryImpl implements IOrderRepository {
    private final IOrderCrudRepository iOrderCrudRepository;
    private final IOrderMapper iOrderMapper;


    @Override
    public Order save(Order order) {
        OrderEntity orderEntity = iOrderMapper.toOrderEntity(order);

        orderEntity.getOrderProducts().forEach(
                orderProductEntity -> orderProductEntity.setOrderEntity(orderEntity)
        );
        return iOrderMapper.toOrder(iOrderCrudRepository.save(orderEntity));
    }

    @Override
    public Order findById(Integer id) {
        return iOrderMapper.toOrder(iOrderCrudRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Orden con ID: " + id + " no encontrada.")
        ));
    }

    @Override
    public Iterable<Order> findAll() {
        return iOrderMapper.toOrderList(iOrderCrudRepository.findAll());
    }

    @Override
    public Iterable<Order> findByUserId(Integer userId) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(userId);
        return iOrderMapper.toOrderList(iOrderCrudRepository.findByUserEntity(userEntity));
    }

    @Override
    public void updateStateById(Integer id, String state) {
        if (state.equals(OrderState.CANCELLED)){
            iOrderCrudRepository.updateStateById(id, OrderState.CANCELLED);
        }else {
            iOrderCrudRepository.updateStateById(id, OrderState.CONFIRMED);
        }
    }

    public List<Object[]> getSalesByDay() {
        return iOrderCrudRepository.getSalesByDay();
    }

    public List<Object[]> getSalesByMonth() {
        return iOrderCrudRepository.getSalesByMonth();
    }

    public List<Object[]> getSalesByYear() {
        return iOrderCrudRepository.getSalesByYear();
    }

    public List<Object[]> getTopSellingProducts() {
        return iOrderCrudRepository.getTopSellingProducts();
    }
}

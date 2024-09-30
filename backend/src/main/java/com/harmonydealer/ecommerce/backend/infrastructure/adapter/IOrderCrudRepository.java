package com.harmonydealer.ecommerce.backend.infrastructure.adapter;

import com.harmonydealer.ecommerce.backend.domain.model.OrderState;
import com.harmonydealer.ecommerce.backend.infrastructure.entity.OrderEntity;
import com.harmonydealer.ecommerce.backend.infrastructure.entity.UserEntity;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IOrderCrudRepository extends CrudRepository<OrderEntity, Integer> {
    @Transactional
    @Modifying
    @Query("UPDATE OrderEntity o SET o.orderState = :state WHERE o.id = :id")
    void updateStateById(Integer id, OrderState state);

    @Query("SELECT DATE(o.dateCreated), SUM(op.quantity) FROM OrderEntity o JOIN o.orderProducts op GROUP BY DATE(o.dateCreated)")
    List<Object[]> getSalesByDay();

    @Query("SELECT MONTH(o.dateCreated), SUM(op.quantity) FROM OrderEntity o JOIN o.orderProducts op GROUP BY MONTH(o.dateCreated)")
    List<Object[]> getSalesByMonth();

    @Query("SELECT YEAR(o.dateCreated), SUM(op.quantity) FROM OrderEntity o JOIN o.orderProducts op GROUP BY YEAR(o.dateCreated)")
    List<Object[]> getSalesByYear();

    @Query("SELECT p.name, SUM(op.quantity) FROM OrderEntity o " +
            "JOIN o.orderProducts op JOIN ProductEntity p ON p.id = op.productId " +
            "GROUP BY p.name ORDER BY SUM(op.quantity) DESC")
    List<Object[]> getTopSellingProducts();

    Iterable<OrderEntity> findByUserEntity(UserEntity userEntity);
}

package com.harmonydealer.ecommerce.backend.infrastructure.mapper;

import com.harmonydealer.ecommerce.backend.domain.model.Order;
import com.harmonydealer.ecommerce.backend.infrastructure.entity.OrderEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = IOrderProductMapper.class)
public interface IOrderMapper {

    @Mappings(
            {
                    @Mapping(source = "id", target = "id"),
                    @Mapping(source = "dateCreated", target = "dateCreated"),
                    @Mapping(source = "orderProducts", target = "orderProducts"),
                    @Mapping(source = "state", target = "state"),
                    @Mapping(source = "userEntity.id", target = "userId")
            }
    )
    Order toOrder(OrderEntity orderEntity);
    Iterable<Order> toOrderList(Iterable<OrderEntity> orderEntities);

    OrderEntity toOrderEntity(Order order);
}

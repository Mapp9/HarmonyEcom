package com.harmonydealer.ecommerce.backend.infrastructure.adapter;

import com.harmonydealer.ecommerce.backend.infrastructure.entity.ProductEntity;
import org.springframework.data.repository.CrudRepository;

public interface IProductCrudRepository extends CrudRepository<ProductEntity, Integer> {
}

package com.harmonydealer.ecommerce.backend.infrastructure.adapter;

import com.harmonydealer.ecommerce.backend.domain.model.Product;
import com.harmonydealer.ecommerce.backend.domain.port.IProductRepository;

public class ProductCrudRepositoryImpl implements IProductRepository {
    @Override
    public Product save(Product product) {
        return null;
    }

    @Override
    public Iterable<Product> findAll() {
        return null;
    }

    @Override
    public Product findById(Integer id) {
        return null;
    }

    @Override
    public void deleteById(Integer id) {

    }
}

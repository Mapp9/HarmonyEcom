package com.harmonydealer.ecommerce.backend.domain.port;

import com.harmonydealer.ecommerce.backend.domain.model.Product;

public interface IProductRepository {
    Product save(Product product);
    Iterable<Product> findAll();
    Product findById(Integer id);
    void deleteById(Integer id);
}

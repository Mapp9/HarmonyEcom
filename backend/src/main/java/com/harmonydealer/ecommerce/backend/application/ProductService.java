package com.harmonydealer.ecommerce.backend.application;

import com.harmonydealer.ecommerce.backend.domain.model.Product;
import com.harmonydealer.ecommerce.backend.domain.port.IProductRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ProductService {
    private final IProductRepository iProductRepository;


    public Product save(Product product){
        return this.iProductRepository.save(product);
    }
    public Iterable<Product> findAll(){
        return this.iProductRepository.findAll();
    }
    public Product findById(Integer id){
        return this.iProductRepository.findById(id);
    }
    public void deleteById(Integer id){
        this.iProductRepository.deleteById(id);
    }
}

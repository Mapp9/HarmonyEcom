package com.harmonydealer.ecommerce.backend.infrastructure.rest;

import com.harmonydealer.ecommerce.backend.application.ProductService;
import com.harmonydealer.ecommerce.backend.domain.model.Product;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/products")
@AllArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {
    private final ProductService productService;

    @PostMapping
    public ResponseEntity<Product> save(@RequestBody Product product){
        log.info("Nombre producto: {}", product.getName());
        return new ResponseEntity<>(productService.save(product), HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<Iterable<Product>> findAll(){
        return ResponseEntity.ok(productService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Integer id){
        return ResponseEntity.ok(productService.findById(id));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletedById(@PathVariable Integer id){
        productService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
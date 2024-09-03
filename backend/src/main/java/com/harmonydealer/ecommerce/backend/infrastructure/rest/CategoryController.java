package com.harmonydealer.ecommerce.backend.infrastructure.rest;

import com.harmonydealer.ecommerce.backend.application.CategoryService;
import com.harmonydealer.ecommerce.backend.domain.model.Category;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin/categories")
@AllArgsConstructor
@Slf4j
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> save(@RequestBody Category category){
        log.info("Nombre categoria: {}", category.getName());
        return new ResponseEntity<>(categoryService.save(category), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Iterable<Category>> findAll(){
        return ResponseEntity.ok(categoryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> findById(@PathVariable Integer id){
        return ResponseEntity.ok(categoryService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteById(@PathVariable Integer id){
        categoryService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

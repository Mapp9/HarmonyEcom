package com.harmonydealer.ecommerce.backend.application;

import com.harmonydealer.ecommerce.backend.domain.model.Category;
import com.harmonydealer.ecommerce.backend.domain.port.ICategoryRepository;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class CategoryService {
    private final ICategoryRepository iCategoryRepository;

    public Category save(Category category){
        return iCategoryRepository.save(category);
    }
    public Iterable<Category> findAll(){
        return iCategoryRepository.findAll();
    }
    public Category findById(Integer id){
        return iCategoryRepository.findById(id);
    }
    public void deleteById(Integer id){
        iCategoryRepository.deleteById(id);
    }
}

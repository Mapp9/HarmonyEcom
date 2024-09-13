package com.harmonydealer.ecommerce.backend.application;

import com.harmonydealer.ecommerce.backend.domain.model.Product;
import com.harmonydealer.ecommerce.backend.domain.port.IProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@AllArgsConstructor
public class ProductService {
    private final IProductRepository iProductRepository;
    private final UploadFile uploadFile;


    public Product save(Product product, MultipartFile multipartFile) throws IOException {
        //Verifica si el producto es nuevo o ya esta en la base de datos
        if (product.getId()!=0){
            //Si multiparFile es igual a null quiere decir que el usuario no cargo una imagen
            if (multipartFile==null){
                //Obtiene la url que ya tenia la imagen y la vuelve a setear
                product.setUrlImage(product.getUrlImage());
            }else{
                product.setUrlImage(uploadFile.upload(multipartFile));
            }
        }else{
            product.setUrlImage(uploadFile.upload(multipartFile));
        }
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

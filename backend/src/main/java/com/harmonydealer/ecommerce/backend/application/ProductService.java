package com.harmonydealer.ecommerce.backend.application;

import com.harmonydealer.ecommerce.backend.domain.model.Product;
import com.harmonydealer.ecommerce.backend.domain.port.IProductRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@AllArgsConstructor
@Slf4j
public class ProductService {
    private final IProductRepository iProductRepository;
    private final UploadFile uploadFile;


    public Product save(Product product, MultipartFile multipartFile) throws IOException {
        if (product.getId()!=0){
            if (multipartFile==null){
                product.setUrlImage(product.getUrlImage());
            }else{
                String nameFile = product.getUrlImage().substring(29);
                log.info("Este es el nombre de la imagen: {}", nameFile);
                if(!nameFile.equals("default.jpg")){
                    uploadFile.delete(nameFile);
                }
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
        Product product = findById(id);
        String nameFile = product.getUrlImage().substring(29);
        log.info("Este es el Nombre de la imagen: {}", nameFile);
        if(!nameFile.equals("default.jpg")){
            uploadFile.delete(nameFile);
        }
        this.iProductRepository.deleteById(id);
    }
}

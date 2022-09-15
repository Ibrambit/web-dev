package ibram.services;

import ibram.models.Product;
import ibram.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

@Service
public class ProductService {

    @Autowired
    private ProductRepo repo;

    @Autowired
    private FilesStorageService storageService;

    public Product addProduct(Product product){
        return repo.save(product);
    }

    public void deleteProduct(Long productId){
        var p = repo.findById(productId).get();
         try{
             File file = new File("src/main/resources/static/"+ p.imagePath);
             System.out.println(file.getAbsolutePath());
             if (file.delete()){
                 repo.deleteById(productId);
             }
         } catch (Exception e){
             System.out.println(e);
         }
    }


}

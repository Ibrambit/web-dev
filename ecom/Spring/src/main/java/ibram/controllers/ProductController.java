package ibram.controllers;

import ibram.models.Product;
import ibram.repo.FilesStorage;
import ibram.repo.ProductRepo;
import ibram.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;

@RequestMapping("admin")
@Controller
public class ProductController {

    @Autowired
    private ProductService service;
    @Autowired
    private ProductRepo repo;

    @Autowired
    FilesStorage storageService;

    @GetMapping("/products")
    public String getIndexProductPage(Model model){
        model.addAttribute("products", repo.findAll());
        return "/admin/products/index";
    }

    @GetMapping("/products/new")
    public String getNewProductPage(){
        return "admin/products/NewProduct";
    }

    @PostMapping(value = "/products/new", consumes = {
            MediaType.APPLICATION_FORM_URLENCODED_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public String postNewProduct(@ModelAttribute ProductRequest product, Model model, @RequestParam("image") MultipartFile file ) {
        var pr = new Product();
        pr.setId(0L);
        pr.setTitle(product.title);
        pr.setPrice(product.price);
        pr.setImage(product.getImage().getOriginalFilename());
        pr.setImagePath("/uploads/" + product.getImage().getOriginalFilename());
        var p = service.addProduct(pr);
        model.addAttribute("product", p);
        try{
            storageService.init();
        } catch (Exception e){

        }
        try {
            storageService.save(file);
        } catch (Exception e) {
           System.out.println(e);
        }
        return "redirect:/admin/products";
    }

    @PostMapping("/products/delete/{productId}")
    public String deleteProduct(@PathVariable Long productId) throws IOException {
        service.deleteProduct(productId);
        return "redirect:/admin/products";
    }

    @GetMapping("/products/edit/{productId}")
    public String getEditProductPage(Model model, @PathVariable Long productId){
        model.addAttribute("product", repo.findById(productId).get());
        return "admin/products/editProduct";
    }

    @PostMapping("/products/edit/{productId}")
    public String editProduct(@PathVariable Long productId, @ModelAttribute ProductRequest product){
        var p = repo.findById(productId).get();
        p.setTitle(product.title);
        p.setPrice(product.price);
        p.setImage(product.getImage().getOriginalFilename());
        service.addProduct(p);
        return "redirect:/admin/products";
    }



}

class ProductRequest {
    public Long id;

    public String title;

    public BigDecimal price;

    public MultipartFile image;


    public Long getId(){
        return id;
    }

    public void setId(Long id){
        this.id = id;
    }

    public void setTitle(String title){
         this.title = title;
    }

    public BigDecimal getPrice(){
        return price;
    }

    public void setPrice(BigDecimal price){
        this.price = price;
    }

    public MultipartFile getImage(){
        return image;
    }

    public void setImage(MultipartFile image){
        this.image = image;
    }



}

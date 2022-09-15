package ibram.controllers;

import ibram.models.CartItem;
import ibram.repo.CartRepo;
import ibram.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class CartController {

    @Autowired
    ProductRepo repo;

    @Autowired
    CartRepo cartRepo;

    @PostMapping("/cart/newProduct/{productId}")
    public String postProductToCart(@PathVariable Long productId){
        var pr = repo.findById(productId).get();
        var cr = new CartItem();
        return "redirect:/";
    }


    @GetMapping("/cart")
    public String getCartPage(Model model){

        return "cart";
    }

}

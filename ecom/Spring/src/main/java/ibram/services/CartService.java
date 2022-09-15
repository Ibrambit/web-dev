package ibram.services;


import ibram.models.CartItem;
import ibram.models.User;
import ibram.repo.CartRepo;
import ibram.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    @Autowired
    private CartRepo repo;

    public void createCart(CartItem cart){
        repo.save(cart);
    }
}

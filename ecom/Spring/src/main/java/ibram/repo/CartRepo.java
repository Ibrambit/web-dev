package ibram.repo;

import ibram.models.CartItem;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepo extends CrudRepository<CartItem, String> {

    @Override
    void deleteById(String email);

    @Override
    Optional<CartItem> findById(String email);

}

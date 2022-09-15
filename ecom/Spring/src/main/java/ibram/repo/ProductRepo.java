package ibram.repo;

import ibram.models.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepo extends CrudRepository<Product, Long> {
    List<Product> findAll();

    @Override
    void deleteAll();

    @Override
    void deleteById(Long aLong);

    @Override
    Optional<Product> findById(Long aLong);

}

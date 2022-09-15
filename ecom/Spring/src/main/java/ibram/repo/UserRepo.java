package ibram.repo;

import ibram.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends CrudRepository<User, String> {
    List<User> findAll();

    @Override
    void deleteAll();

    @Override
    void deleteById(String email);

    @Override
    Optional<User> findById(String email);

}

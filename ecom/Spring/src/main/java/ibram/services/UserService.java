package ibram.services;

import ibram.models.User;
import ibram.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepo repo;

    public void createUser(User user){
        repo.save(user);
    }

    public void deleteUser(User user){
        repo.deleteById(user.email);
    }

}

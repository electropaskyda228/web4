package com.electropaskyda.web5.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUser(User user) {
        User result = userRepository.findByUsername(user.getUsername());
        if (result == null) {
            return createUser(user);
        }
        if (!user.comparePassword(result)) {
            return null;
        }
        return result;
    }

    public User createUser(User user) {
        user.prepareForSaving();
        return userRepository.save(user);
    }
}

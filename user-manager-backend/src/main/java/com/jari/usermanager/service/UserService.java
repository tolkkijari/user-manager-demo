package com.jari.usermanager.service;

import com.jari.usermanager.dto.User;
import com.jari.usermanager.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private TransactionTemplate transactionTemplate;
    private UserRepository userRepository;

    public UserService(PlatformTransactionManager transactionManager, UserRepository userRepository) {
        this.transactionTemplate = new TransactionTemplate(transactionManager);
        this.userRepository = userRepository;
    }

    public User getUserById(long id) {
       return transactionTemplate.execute(status -> userRepository.findById(id))
                .orElseThrow(() -> new RuntimeException(String.format("Missing a user with the id %d.", id)));
    }

    public List<User> getAllUsers() {
        return transactionTemplate.execute(status -> userRepository.findAll());
    }
}

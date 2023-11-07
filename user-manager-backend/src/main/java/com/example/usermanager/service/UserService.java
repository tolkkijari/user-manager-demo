package com.example.usermanager.service;

import com.example.usermanager.dto.RemoteUserDto;
import com.example.usermanager.dto.User;
import com.example.usermanager.external.ExternalDataRequester;
import com.example.usermanager.mapper.UserMapper;
import com.example.usermanager.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private TransactionTemplate transactionTemplate;
    private UserRepository userRepository;
    private ExternalDataRequester externalDataRequester;
    private final UserMapper userMapper;

    public UserService(PlatformTransactionManager transactionManager, UserRepository userRepository,
                       ExternalDataRequester externalDataRequester,
                       UserMapper userMapper) {
        this.transactionTemplate = new TransactionTemplate(transactionManager);
        this.userRepository = userRepository;
        this.externalDataRequester = externalDataRequester;
        this.userMapper = userMapper;
    }

    public User getUserById(long id) {
       return transactionTemplate.execute(status -> userRepository.findById(id))
                .orElseThrow(() -> new RuntimeException(String.format("Missing a user with the id %d.", id)));
    }

    public List<User> getAllUsers() {
        return transactionTemplate.execute(status -> userRepository.findAll());
    }

    public List<User> resetAllUsers() {
    //public void resetAllUsers() {
        List<RemoteUserDto> remoteUserDtos = externalDataRequester.requestUsers();

        if(remoteUserDtos == null || remoteUserDtos.isEmpty()) {
            throw new RuntimeException("Couldn't reset users, didn't get new users from the remote endpoint.");
        }

        List<User> users = remoteUserDtos.stream().map(userMapper::remoteUserDtotoUser).toList();
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                userRepository.deleteAll();
            }
        });

        return transactionTemplate.execute(status -> userRepository.saveAll(users));
        //transactionTemplate.execute(status -> userRepository.saveAll(users));
    }
}

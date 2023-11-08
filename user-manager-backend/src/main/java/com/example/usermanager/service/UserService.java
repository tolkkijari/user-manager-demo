package com.example.usermanager.service;

import com.example.usermanager.dto.DeletedUserIdDto;
import com.example.usermanager.dto.IncomingFieldsDto;
import com.example.usermanager.dto.remoteUser.RemoteUserDto;
import com.example.usermanager.dto.User;
import com.example.usermanager.external.ExternalDataRequester;
import com.example.usermanager.mapper.UserMapper;
import com.example.usermanager.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

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

    @Transactional
    public User getUserById(long id) {
       return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Missing a user with the id %d.", id)));
    }

    @Transactional
    public DeletedUserIdDto deleteUser(long id) {
        log.info(String.format("Started to delete the user having the id %d.", id));
        if(!userRepository.existsById(id)) {
            throw new RuntimeException(String.format("Missing a user with the id %d, can't delete.", id));
        }

        userRepository.deleteById(id);
        log.info(String.format("The user having the id %d deleted successfully.", id));
        DeletedUserIdDto idDto = new DeletedUserIdDto();
        idDto.setId(id);
        return idDto;
    }

    @Transactional
    public List<User> getUserList() {
        List<User> users = userRepository.findAll();
        if(users.isEmpty()) {
            throw new RuntimeException("Couldn't fetch any users from DB.");
        }
        log.info(String.format("Fetched %d users from DB", users.size()));
        return users;
    }

    @Transactional
    public User createUser(IncomingFieldsDto fieldsDto) {
        log.info(String.format("Started to save a new user with this data %s.", fieldsDto));
        User newUser = userMapper.incomingFieldsDtoToUser(fieldsDto);
        newUser = userRepository.save(newUser);
        log.info(String.format("Saved successfully the new user having the id %d.", newUser.getId()));
        return newUser;
    }

    @Transactional
    public User overwriteUserData(long id, IncomingFieldsDto fieldsDto) {
        log.info(String.format("Started to update/overwrite the user having the id %d with this data %s.", id, fieldsDto));

        User user = userRepository.findById(id).
                orElseThrow(() -> new RuntimeException(String.format("Missing a user with the id %d, can't delete.", id)));

        User newUser = userMapper.incomingFieldsDtoToUser(fieldsDto);
        newUser.setId(user.getId());
        newUser.setOriginalId(user.getOriginalId());

        User savedUser = userRepository.save(newUser);
        log.info(String.format("Updated the user having the id %d successfully", id));
        return savedUser;
    }

    public List<User> resetAllUsers() {
        log.info("Starting to reset all the users.");
        List<RemoteUserDto> remoteUserDtos = externalDataRequester.requestUsers();

        if(remoteUserDtos == null || remoteUserDtos.isEmpty()) {
            throw new RuntimeException("Couldn't reset users, didn't get new users from the remote endpoint.");
        }
        log.info(String.format("Got %d users from the remote server.", remoteUserDtos.size()));

        List<User> users = remoteUserDtos.stream().map(userMapper::remoteUserDtoToUser).toList();
        long oldCount = users.size();
        //Better to not run HTTP requests in a @Transactional method to not overwhelm the db connection pool.
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                userRepository.deleteAll();
            }
        });
        log.info(String.format("Deleted %d old users.", oldCount));

        return transactionTemplate.execute(status -> userRepository.saveAll(users));
    }
}

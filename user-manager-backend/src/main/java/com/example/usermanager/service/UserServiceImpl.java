package com.example.usermanager.service;

import com.example.usermanager.dao.UserDao;
import com.example.usermanager.db.UserSearch;
import com.example.usermanager.dto.DeletedUserIdDto;
import com.example.usermanager.dto.IncomingFieldsDto;
import com.example.usermanager.dto.SearchDto;
import com.example.usermanager.dto.UserDto;
import com.example.usermanager.dto.remoteUser.RemoteUserDto;
import com.example.usermanager.external.ExternalDataRequester;
import com.example.usermanager.mapper.UserMapper;
import com.example.usermanager.db.UserRepository;
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
public class UserServiceImpl implements UserService {

    private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);

    private TransactionTemplate transactionTemplate;
    private UserRepository userRepository;
    private ExternalDataRequester externalDataRequester;
    private UserMapper userMapper;
    private UserSearch userSearch;

    public UserServiceImpl(PlatformTransactionManager transactionManager, UserRepository userRepository,
                           ExternalDataRequester externalDataRequester,
                           UserMapper userMapper, UserSearch userSearch) {
        this.transactionTemplate = new TransactionTemplate(transactionManager);
        this.userRepository = userRepository;
        this.externalDataRequester = externalDataRequester;
        this.userMapper = userMapper;
        this.userSearch = userSearch;
    }

    @Override
    @Transactional
    public UserDto getUserById(long id) {
       UserDao user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(String.format("Missing a user with the id %d.", id)));
       return userMapper.userToUserDto(user);
    }

    @Override
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

    @Override
    @Transactional
    public List<UserDto> getUserList() {
        List<UserDao> userDaos = userRepository.findAll();
        if(userDaos.isEmpty()) {
            throw new RuntimeException("Couldn't fetch any users from DB.");
        }
        log.info(String.format("Fetched %d users from DB", userDaos.size()));
        return userDaos.stream().map(userMapper::userToUserDto).toList();
    }

    @Override
    @Transactional
    public UserDto createUser(IncomingFieldsDto fieldsDto) {
        log.info(String.format("Started to save a new user with this data %s.", fieldsDto));
        UserDao newUserDao = userMapper.incomingFieldsDtoToUser(fieldsDto);
        newUserDao = userRepository.save(newUserDao);
        log.info(String.format("Saved successfully the new user having the id %d.", newUserDao.getId()));
        return userMapper.userToUserDto(newUserDao);
    }

    @Override
    @Transactional
    public UserDto overwriteUserData(long id, IncomingFieldsDto fieldsDto) {
        log.info(String.format("Started to update/overwrite the user having the id %d with this data %s.", id, fieldsDto));

        UserDao userDao = userRepository.findById(id).
                orElseThrow(() -> new RuntimeException(String.format("Missing a user with the id %d, can't delete.", id)));

        UserDao newUserDao = userMapper.incomingFieldsDtoToUser(fieldsDto);
        newUserDao.setId(userDao.getId());
        newUserDao.setOriginalId(userDao.getOriginalId());

        UserDao savedUserDao = userRepository.save(newUserDao);
        log.info(String.format("Updated the user having the id %d successfully", id));
        return userMapper.userToUserDto(savedUserDao);
    }

    @Override
    public List<UserDto> resetAllUsers() {
        log.info("Starting to reset all the users.");
        List<RemoteUserDto> remoteUserDtos = externalDataRequester.requestUsers();

        if(remoteUserDtos == null || remoteUserDtos.isEmpty()) {
            throw new RuntimeException("Couldn't reset users, didn't get new users from the remote endpoint.");
        }
        log.info(String.format("Got %d users from the remote server.", remoteUserDtos.size()));

        List<UserDao> userDaos = remoteUserDtos.stream().map(userMapper::remoteUserDtoToUser).toList();
        long oldCount = userDaos.size();
        //Better to not run HTTP requests in a @Transactional method to not overwhelm the db connection pool.
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                userRepository.deleteAll();
            }
        });
        log.info(String.format("Deleted %d old users.", oldCount));

        return transactionTemplate.execute(status -> userRepository.saveAll(userDaos))
                .stream().map(userMapper::userToUserDto).toList();
    }

    @Override
    public List<UserDto> searchUsers(SearchDto searchDto) {
        return userSearch.runSearch(searchDto.getFieldName(), searchDto.getSearchText())
                .stream().map(userMapper::userToUserDto).toList();
    }

}

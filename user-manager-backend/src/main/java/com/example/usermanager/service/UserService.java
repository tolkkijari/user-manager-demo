package com.example.usermanager.service;

import com.example.usermanager.dao.UserDao;
import com.example.usermanager.dto.DeletedUserIdDto;
import com.example.usermanager.dto.IncomingFieldsDto;
import com.example.usermanager.dto.SearchDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService {
    @Transactional
    UserDao getUserById(long id);

    @Transactional
    DeletedUserIdDto deleteUser(long id);

    @Transactional
    List<UserDao> getUserList();

    @Transactional
    UserDao createUser(IncomingFieldsDto fieldsDto);

    @Transactional
    UserDao overwriteUserData(long id, IncomingFieldsDto fieldsDto);

    List<UserDao> resetAllUsers();

    List<UserDao> searchUsers(SearchDto searchDto);
}

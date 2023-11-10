package com.example.usermanager.service;

import com.example.usermanager.dto.DeletedUserIdDto;
import com.example.usermanager.dto.IncomingFieldsDto;
import com.example.usermanager.dto.SearchDto;
import com.example.usermanager.dto.UserDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UserService {
    @Transactional
    UserDto getUserById(long id);

    @Transactional
    DeletedUserIdDto deleteUser(long id);

    @Transactional
    List<UserDto> getUserList();

    @Transactional
    UserDto createUser(IncomingFieldsDto fieldsDto);

    @Transactional
    UserDto overwriteUserData(long id, IncomingFieldsDto fieldsDto);

    String resetAllUsers();

    List<UserDto> searchUsers(SearchDto searchDto);
}

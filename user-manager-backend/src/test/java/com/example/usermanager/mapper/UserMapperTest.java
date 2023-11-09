package com.example.usermanager.mapper;

import com.example.usermanager.dao.UserDao;
import com.example.usermanager.dto.IncomingFieldsDto;
import com.example.usermanager.dto.UserDto;
import com.example.usermanager.dto.remoteUser.RemoteUserDto;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class UserMapperTest {

    private UserMapper userMapper;
    private Mocks mocks;

    public UserMapperTest() {
        this.userMapper = new UserMapperImpl();
        this.mocks = new Mocks();
    }

    @Test
    void normalMapping() {
        UserDao userDao = mocks.happyCaseUserDao();
        UserDto userDto = mocks.happyCaseUserDto();
        UserDto resultDto = userMapper.userToUserDto(userDao);
        assertThat(resultDto).usingRecursiveComparison().isEqualTo(userDto);
    }

    @Test
    void htmlInjectionMapping() {
        UserDao userDao = mocks.htmlInjectionCaseUserDao();
        UserDto userDto = mocks.htmlInjectionCaseUserDto();
        UserDto resultDto = userMapper.userToUserDto(userDao);
        assertThat(resultDto).usingRecursiveComparison().isEqualTo(userDto);
    }

    @Test
    void remoteUserToUserDao() {
        RemoteUserDto remoteUserDto = mocks.normalRemoteUser();
        UserDao userDao = mocks.normalUserFromRemoteUser();
        UserDao resultDao = userMapper.remoteUserDtoToUser(remoteUserDto);
        assertThat(resultDao).usingRecursiveComparison().isEqualTo(userDao);
    }

    @Test
    void incomingFieldsDtoToUserDao() {
        IncomingFieldsDto incomingFieldsDto = mocks.incomingFieldsDto();
        UserDao userDao = mocks.incomingFieldsUserDao();
        UserDao resultDao = userMapper.incomingFieldsDtoToUser(incomingFieldsDto);
        assertThat(resultDao).usingRecursiveComparison().isEqualTo(userDao);
    }
}

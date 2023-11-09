package com.example.usermanager.mapper;

import com.example.usermanager.dto.IncomingFieldsDto;
import com.example.usermanager.dto.remoteUser.RemoteUserDto;
import com.example.usermanager.dao.UserDao;
import org.mapstruct.AfterMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "originalId", source = "id")
    @Mapping(target = "address", ignore = true)
    @Mapping(target = "postalAddress", ignore = true)
    @Mapping(target = "company", ignore = true)
    @Mapping(target = "name", ignore = true)
    UserDao remoteUserDtoToUser(RemoteUserDto remoteUserDto);

    @AfterMapping
    default void setComplexData(@MappingTarget UserDao userDao, RemoteUserDto remoteUserDto) {
        userDao.setAddress(String.format("%s %s", remoteUserDto.getAddress().getStreet(), remoteUserDto.getAddress().getSuite()));
        userDao.setPostalAddress(String.format("%s %s", remoteUserDto.getAddress().getZipcode(), remoteUserDto.getAddress().getCity()));
        userDao.setCompany(remoteUserDto.getCompany().getName());
        String name = remoteUserDto.getName();
        if(name == null || name.isEmpty()) {
            throw new RuntimeException(String.format("Can't map a remote user to a user object, name is null or empty. Remote user id %d.",
                    remoteUserDto.getId()));
        }
        userDao.setName(name);
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "originalId", ignore = true)
    UserDao incomingFieldsDtoToUser(IncomingFieldsDto incomingFieldsDto);
}

package com.example.usermanager.mapper;

import com.example.usermanager.dto.IncomingFieldsDto;
import com.example.usermanager.dto.UserDto;
import com.example.usermanager.dto.remoteUser.RemoteUserDto;
import com.example.usermanager.dao.UserDao;
import org.mapstruct.*;
import org.owasp.encoder.Encode;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "originalId", source = "id")
    @Mapping(target = "id", ignore = true)
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

    @Mapping(target = "name", source = "name", qualifiedByName = "encodeHtml")
    @Mapping(target = "username", source = "username", qualifiedByName = "encodeHtml")
    @Mapping(target = "email", source = "email", qualifiedByName = "encodeHtml")
    @Mapping(target = "address", source = "address", qualifiedByName = "encodeHtml")
    @Mapping(target = "postalAddress", source = "postalAddress", qualifiedByName = "encodeHtml")
    @Mapping(target = "phone", source = "phone", qualifiedByName = "encodeHtml")
    @Mapping(target = "website", source = "website", qualifiedByName = "encodeHtml")
    @Mapping(target = "company", source = "company", qualifiedByName = "encodeHtml")
    UserDto userToUserDto(UserDao user);

    //Stored HTML injections are mitigated with this, even though React takes good care of by preventing injections.
    @Named("encodeHtml")
    public static String encodeHtml(String input) {
        return Encode.forHtml(input);
    }
}

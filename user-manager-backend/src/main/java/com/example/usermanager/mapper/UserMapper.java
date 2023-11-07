package com.example.usermanager.mapper;

import com.example.usermanager.dto.RemoteUserDto;
import com.example.usermanager.dto.User;
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
    User remoteUserDtotoUser(RemoteUserDto remoteUserDto);

    @AfterMapping
    default void setAddresses(@MappingTarget User user, RemoteUserDto remoteUserDto) {
        user.setAddress(String.format("%s %s", remoteUserDto.getAddress().getStreet(), remoteUserDto.getAddress().getSuite()));
        user.setPostalAddress(String.format("%s %s", remoteUserDto.getAddress().getZipcode(), remoteUserDto.getAddress().getCity()));
        user.setCompany(remoteUserDto.getCompany().getName());
    }
}

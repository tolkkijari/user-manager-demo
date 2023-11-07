package com.example.usermanager.dto;

import lombok.Data;

@Data
public class RemoteUserDto {
    Long id;
    String name;
    String username;
    String email;
    RemoteUserAddressDto address;
    String phone;
    String website;
    RemoteUserCompanyDto company;
}

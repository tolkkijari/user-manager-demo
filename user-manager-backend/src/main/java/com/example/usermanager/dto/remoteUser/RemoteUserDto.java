package com.example.usermanager.dto.remoteUser;

import lombok.Data;

@Data
public class RemoteUserDto {
    private Long id;
    private String name;
    private String username;
    private String email;
    private RemoteUserAddressDto address;
    private String phone;
    private String website;
    private RemoteUserCompanyDto company;
}

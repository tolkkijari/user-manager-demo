package com.example.usermanager.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private Long originalId;
    private String name;
    private String username;
    private String email;
    private String address;
    private String postalAddress;
    private String phone;
    private String website;
    private String company;
}

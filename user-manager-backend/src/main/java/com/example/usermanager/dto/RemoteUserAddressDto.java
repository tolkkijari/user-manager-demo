package com.example.usermanager.dto;

import lombok.Data;

@Data
public class RemoteUserAddressDto {
    String street;
    String suite;
    String city;
    String zipcode;
    RemoteUserAddressGeoDto geo;
}

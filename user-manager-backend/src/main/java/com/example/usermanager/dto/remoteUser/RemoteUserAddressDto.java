package com.example.usermanager.dto.remoteUser;

import lombok.Data;

@Data
public class RemoteUserAddressDto {
    private String street;
    private String suite;
    private String city;
    private String zipcode;
    private RemoteUserAddressGeoDto geo;
}

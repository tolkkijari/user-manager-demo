package com.example.usermanager.external;

import com.example.usermanager.dto.remoteUser.RemoteUserDto;

import java.util.List;

public interface ExternalDataRequester {
    List<RemoteUserDto> requestUsers();
}

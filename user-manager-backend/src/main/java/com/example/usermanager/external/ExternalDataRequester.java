package com.example.usermanager.external;

import com.example.usermanager.dto.RemoteUserDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class ExternalDataRequester {

    @Value("${com.example.usermanager.external.source}")
    private String remoteRestEndpoint;

    private final ObjectMapper mapper;

    public ExternalDataRequester() {
        this.mapper = new ObjectMapper();
    }

    public List<RemoteUserDto> requestUsers() {

        if(remoteRestEndpoint == null) {
            throw new RuntimeException("The remote rest endpoint was null.");
        }

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Object[]> responseEntity = restTemplate.getForEntity(remoteRestEndpoint, Object[].class);
        Object[] objects = responseEntity.getBody();
        if(objects == null) {
            throw new RuntimeException("The body of the remote user request was null.");
        }
        return Arrays.stream(objects)
                .map(object -> mapper.convertValue(object, RemoteUserDto.class))
                .collect(Collectors.toList());

    }
}

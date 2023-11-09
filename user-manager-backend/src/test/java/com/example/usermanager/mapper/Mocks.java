package com.example.usermanager.mapper;

import com.example.usermanager.dao.UserDao;
import com.example.usermanager.dto.IncomingFieldsDto;
import com.example.usermanager.dto.UserDto;
import com.example.usermanager.dto.remoteUser.RemoteUserAddressDto;
import com.example.usermanager.dto.remoteUser.RemoteUserAddressGeoDto;
import com.example.usermanager.dto.remoteUser.RemoteUserCompanyDto;
import com.example.usermanager.dto.remoteUser.RemoteUserDto;
import org.springframework.stereotype.Component;

@Component
public class Mocks {

    public UserDao happyCaseUserDao() {
        UserDao user = new UserDao();
        user.setId(1L);
        user.setOriginalId(1L);
        user.setName("Test");
        user.setUsername("test");
        user.setEmail("a1@ecxample.com");
        user.setAddress("ExampleRoad 1");
        user.setPostalAddress("80100 TestTown");
        user.setPhone("0501234567");
        user.setWebsite("google.com");
        user.setCompany("An BugSolvers Oy");

        return user;
    }

    public UserDto happyCaseUserDto() {
        UserDto user = new UserDto();
        user.setId(1L);
        user.setOriginalId(1L);
        user.setName("Test");
        user.setUsername("test");
        user.setEmail("a1@ecxample.com");
        user.setAddress("ExampleRoad 1");
        user.setPostalAddress("80100 TestTown");
        user.setPhone("0501234567");
        user.setWebsite("google.com");
        user.setCompany("An BugSolvers Oy");

        return user;
    }

    public UserDao htmlInjectionCaseUserDao() {
        UserDao user = new UserDao();
        user.setId(1L);
        user.setOriginalId(1L);
        user.setName("Test");
        user.setUsername("<strong>test</strong>");
        user.setEmail("a1@ecxample.com");
        user.setAddress("ExampleRoad 1");
        user.setPostalAddress("80100 TestTown");
        user.setPhone("0501234567");
        user.setWebsite("google.com");
        user.setCompany("An BugSolvers Oy");

        return user;
    }

    public UserDto htmlInjectionCaseUserDto() {
        UserDto user = new UserDto();
        user.setId(1L);
        user.setOriginalId(1L);
        user.setName("Test");
        user.setUsername("&lt;strong&gt;test&lt;/strong&gt;");
        user.setEmail("a1@ecxample.com");
        user.setAddress("ExampleRoad 1");
        user.setPostalAddress("80100 TestTown");
        user.setPhone("0501234567");
        user.setWebsite("google.com");
        user.setCompany("An BugSolvers Oy");

        return user;
    }

    public RemoteUserDto normalRemoteUser() {
        RemoteUserCompanyDto companyDto = new RemoteUserCompanyDto();
        companyDto.setBs("Lorem ipsum");
        companyDto.setName("Esimerkkifirma Oy");
        companyDto.setCatchPhrase("Veni vidi vici");

        RemoteUserAddressGeoDto geoDto = new RemoteUserAddressGeoDto();
        geoDto.setLat("1234");
        geoDto.setLng("1234");

        RemoteUserAddressDto addressDto = new RemoteUserAddressDto();
        addressDto.setCity("Helsinki");
        addressDto.setStreet("Erottaja");
        addressDto.setSuite("200");
        addressDto.setZipcode("00100");
        addressDto.setGeo(geoDto);

        RemoteUserDto user = new RemoteUserDto();
        user.setId(10L);
        user.setName("Test");
        user.setUsername("test2");
        user.setEmail("a1@ecxample.com");
        user.setAddress(addressDto);
        user.setPhone("0501234567");
        user.setWebsite("google.com");
        user.setCompany(companyDto);

        return user;
    }

    public UserDao normalUserFromRemoteUser() {
        UserDao user = new UserDao();
        user.setOriginalId(10L);
        user.setName("Test");
        user.setUsername("test2");
        user.setEmail("a1@ecxample.com");
        user.setAddress("Erottaja 200");
        user.setPostalAddress("00100 Helsinki");
        user.setPhone("0501234567");
        user.setWebsite("google.com");
        user.setCompany("Esimerkkifirma Oy");

        return user;
    }

    public UserDao incomingFieldsUserDao() {
        UserDao user = new UserDao();
        user.setName("Test");
        user.setUsername("test");
        user.setEmail("a1@ecxample.com");
        user.setAddress("ExampleRoad 1");
        user.setPostalAddress("80100 TestTown");
        user.setPhone("0501234567");
        user.setWebsite("google.com");
        user.setCompany("An BugSolvers Oy");

        return user;
    }

    public IncomingFieldsDto incomingFieldsDto() {
        IncomingFieldsDto user = new IncomingFieldsDto();
        user.setName("Test");
        user.setUsername("test");
        user.setEmail("a1@ecxample.com");
        user.setAddress("ExampleRoad 1");
        user.setPostalAddress("80100 TestTown");
        user.setPhone("0501234567");
        user.setWebsite("google.com");
        user.setCompany("An BugSolvers Oy");

        return user;
    }
}

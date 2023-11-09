package com.example.usermanager.dao;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="user")
public class UserDao {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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

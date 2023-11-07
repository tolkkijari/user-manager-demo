package com.example.usermanager.dto;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    Long originalId;
    String name;
    String username;
    String email;
    String address;
    String postalAddress;
    String phone;
    String website;
    String company;
}

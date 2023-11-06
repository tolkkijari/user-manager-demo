package com.jari.usermanager.dto;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    String name;
    String email;
    String street;
    String suite;
    String town;
    String zip;
    String phone;
    String website;
    String company;
}

package com.example.usermanager.db;

import com.example.usermanager.dao.UserDao;

import java.util.List;

public interface UserSearch {
    List<UserDao> runSearch(String columnName, String searchTerm);
}

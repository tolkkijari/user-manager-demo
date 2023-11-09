package com.example.usermanager.db;

import com.example.usermanager.dao.UserDao;
import com.example.usermanager.enums.SearchFieldNames;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class UserSearch {

    private JdbcTemplate jdbcTemplate;
    public UserSearch(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<UserDao> runSearch(String columnName, String searchTerm) {
        String cleanColumnName = validateFieldName(columnName);
        List<UserDao> results = jdbcTemplate.query("SELECT * FROM user WHERE " + cleanColumnName + " LIKE CONCAT('%',?,'%')",
                new BeanPropertyRowMapper<UserDao>(UserDao.class), searchTerm);
        return results;
    }

    private String validateFieldName(String fieldName) {
        if(Arrays.stream(SearchFieldNames.values()).noneMatch(sfn -> sfn.name().equals(fieldName))) {
            throw new RuntimeException(String.format("%s is not a suitable field name for search.", fieldName));
        }

        String columnName = fieldName.equals("postalAddress") ? "postal_address" : fieldName;

        return columnName;
    }
}

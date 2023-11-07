package com.example.usermanager.rest;

import com.example.usermanager.dto.User;
import com.example.usermanager.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getById(@PathVariable long id) {
        return userService.getUserById(id);
    }

    //NON-RESTFUL ENDPOINTS
    @PostMapping("/reset-all")
    public List<User> resetAll() {
        return userService.resetAllUsers();
    }
}
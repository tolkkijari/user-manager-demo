package com.example.usermanager.rest;

import com.example.usermanager.dao.UserDao;
import com.example.usermanager.dto.DeletedUserIdDto;
import com.example.usermanager.dto.IncomingFieldsDto;
import com.example.usermanager.dto.SearchDto;
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
    public List<UserDao> getAll() {
        return userService.getUserList();
    }

    @GetMapping("/{id}")
    public UserDao getById(@PathVariable long id) {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public UserDao update(@PathVariable long id, @RequestBody IncomingFieldsDto fieldsDto) {
        return userService.overwriteUserData(id, fieldsDto);
    }

    @PostMapping("/create")
    public UserDao create(@RequestBody IncomingFieldsDto fieldsDto) {
        return userService.createUser(fieldsDto);
    }

    @DeleteMapping("/{id}")
    public DeletedUserIdDto delete(@PathVariable long id) {
        return userService.deleteUser(id);
    }


    //NON-RESTFUL, BUT STILL NEEDED ENDPOINTS
    @PostMapping("/search")
    public List<UserDao> search(@RequestBody SearchDto searchDto) {
        return userService.searchUsers(searchDto);
    }

    @PostMapping("/reset-all")
    public List<UserDao> resetAll() {
        return userService.resetAllUsers();
    }
}
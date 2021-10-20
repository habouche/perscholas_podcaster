package org.perscholas.podcaster.controller;

import jdk.javadoc.doclet.Reporter;
import lombok.Getter;
import org.perscholas.podcaster.entity.User;
import org.perscholas.podcaster.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping(path="/creators")
    public Optional<List<User>> getCreators(){
        return this.userService.getCreators();
    }

    @GetMapping(path="/creators/search")
    public Optional<List<User>> searchCreators(@RequestParam String username){
        return this.userService.searchCreators(username);
    }

    @GetMapping(path="/isCreator")
    public ResponseEntity<Boolean> isCreator(@RequestParam String username){
        System.out.println(username);
        boolean isCreator = this.userService.isCreator(username);
        return new ResponseEntity<>(isCreator, HttpStatus.OK);
    }
}
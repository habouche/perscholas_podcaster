package org.perscholas.podcaster.controller;

import jdk.javadoc.doclet.Reporter;
import lombok.Getter;
import org.perscholas.podcaster.entity.User;
import org.perscholas.podcaster.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
//@PreAuthorize("hasAuthority('CREATOR')")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping(path="/creators")
    public Optional<List<User>> getCreators(){
        return this.userService.getCreators();
    }




}
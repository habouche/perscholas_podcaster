package org.perscholas.podcaster.registration;

import org.perscholas.podcaster.entity.User;
import org.perscholas.podcaster.repository.UserRoleRepository;
import org.perscholas.podcaster.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class RegistrationService {

    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private UserRoleRepository userRoleRepository;

    public ResponseEntity<Optional> register(RegistrationRequest request) {
        System.out.println("RegistrationRequest :" + request);
        //create user
        User user = new User();
        user.setFullName(request.getFullName());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setUserName(request.getUserName());

        return myUserDetailsService.signUpUser(user,request.getRole());
    }
}

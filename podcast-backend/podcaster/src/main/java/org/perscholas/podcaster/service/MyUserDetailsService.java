package org.perscholas.podcaster.service;

import org.perscholas.podcaster.entity.MyUserPrincipal;
import org.perscholas.podcaster.entity.User;
import org.perscholas.podcaster.entity.UserRole;
import org.perscholas.podcaster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) {
        final User user = userRepository.findByUserName(username);
        if (user == null) {
            throw new UsernameNotFoundException(username);
        }

        MyUserPrincipal principal  = new MyUserPrincipal(user);
        return principal;
    }

    public ResponseEntity<Optional> signUpUser(User principal, String role) {
        boolean userExists = userRepository
                .findByUserName(principal.getUserName()) != null;
        if (userExists) {
            // TODO check of attributes are the same and
            // TODO if email not confirmed send confirmation email.
            throw new IllegalStateException("UserName already Taken");
        }

        String encodedPassword = bCryptPasswordEncoder
                .encode(principal.getPassword());

        principal.setPassword(encodedPassword);
        userRepository.save(principal);
        //Create UserRole
        assignRole(principal.getUserName(),role);
        return ResponseEntity.status(200).build();
}

    private void assignRole(String username, String role) {
        //Retrieve User from DB
        User user = userRepository.findByUserName(username);

        //Create a list of UserRoles + User Role
        List<UserRole> userRoles = new ArrayList<UserRole>();
        UserRole userRole = new UserRole(role);
        userRoles.add(userRole);

        //Add Roles to the User + User to Role
        userRole.setUser(user);
        user.setUserRoles(userRoles);

        //Persist
        userRepository.save(user);
    }

}
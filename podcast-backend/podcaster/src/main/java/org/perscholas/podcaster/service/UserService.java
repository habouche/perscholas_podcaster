package org.perscholas.podcaster.service;

import org.perscholas.podcaster.entity.User;
import org.perscholas.podcaster.entity.UserRole;
import org.perscholas.podcaster.exception.ResourceNotFoundException;
import org.perscholas.podcaster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User findById(Long id) {

        User user = this.userRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
        return user;
    }

    public List<User> findAll() {
        return this.userRepository
                .findAll();
    }

    public void deleteById(Long id) {
        this.userRepository.deleteById(id);
    }

    public Optional<List<User>> getCreators(){
        List<User> creators = this.userRepository.findAll().stream()
                .filter(user -> user.getUserRoles().stream()
                .anyMatch(userRole -> userRole.getUserRole().equals("CREATOR")))
                .collect(Collectors.toList());
        System.out.println("creators : " +creators);
        return Optional.ofNullable(creators);
    }

    public Optional<List<User>> searchCreators(String username){
        List<User> creators = this.userRepository.findByUsernameLike(username).stream()
                .filter(user -> user.getUserRoles().stream()
                        .anyMatch(userRole -> userRole.getUserRole().equals("CREATOR")))
                .collect(Collectors.toList());
        System.out.println("creators : " +creators);
        return Optional.ofNullable(creators);
    }



}

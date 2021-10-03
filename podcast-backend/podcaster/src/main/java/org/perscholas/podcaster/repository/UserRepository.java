package org.perscholas.podcaster.repository;

import org.perscholas.podcaster.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String username);
}
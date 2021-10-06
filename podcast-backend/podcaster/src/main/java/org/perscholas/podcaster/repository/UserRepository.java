package org.perscholas.podcaster.repository;

import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByUserName(String username);

    @Query("select u from User u where lower(u.userName) like lower(concat('%',?1,'%'))")
    List<User> findByUsernameLike(@Param("userName")String userName);
}
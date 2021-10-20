package org.perscholas.podcaster;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.entity.User;
import org.perscholas.podcaster.repository.PodcastRepository;
import org.perscholas.podcaster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void testSaveNewUser() {
        //Given
        User user = new User();
        user.setUserName("Ferhat");
        user.setEmail("ferhat@gmail.com");
        user.setFullName("Ferhat Habouche");
        user.setPassword("password");


        //When
        User savedUser = userRepository.save(user);

        //Then
        assertThat(savedUser.getId()).isGreaterThan(0);
        assertThat(savedUser.getUserName()).isEqualTo(user.getUserName());
    }

    @Test
    @Order(2)
    @Rollback(value = false)
    public void testFindUserByUsername() {
        User user = userRepository.findByUserName("Ferhat");
        assertThat(user.getUserName()).isEqualTo("Ferhat");
    }

    @Test
    @Order(3)
    @Rollback(value = false)
    public void testListUsers() {
        List<User> users = (List<User>) userRepository.findAll();
        assertThat(users).size().isGreaterThan(0);
    }


    @Test
    @Order(4)
    @Rollback(false)
    public void testUpdateUser() {
        User user = userRepository.findByUserName("Ferhat");
        user.setEmail("updated@gmail.com");

        userRepository.save(user);

        User updatedUser = userRepository.findByUserName("Ferhat");

        assertThat(updatedUser.getEmail()).isEqualTo("updated@gmail.com");
    }

    @Test
    @Order(5)
    @Rollback(false)
    public void testDeleteUser() {
        User user = userRepository.findByUserName("Ferhat");

        userRepository.deleteById(user.getId());

        User deletedUser= userRepository.findByUserName("Ferhat");

        assertThat(deletedUser).isNull();

    }
}

package org.perscholas.podcaster.controller;


import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.entity.User;
import org.perscholas.podcaster.repository.EpisodeRepository;
import org.perscholas.podcaster.repository.PodcastRepository;
import org.perscholas.podcaster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class SubscriptionController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PodcastRepository podcastRepository;

    @Autowired
    private EpisodeRepository episodeRepository;

    @PostMapping("/subscribe")
    @ResponseBody
    public ResponseEntity subscribe(@RequestParam String username,@RequestParam Integer id ) {

        System.out.println("username:" +username + " Id: " +id);
        User user = userRepository.findByUserName(username);
        Podcast podcast = podcastRepository.getById(id);
        user.getPodcasts().add(podcast);
        userRepository.save(user);
        podcast.getUsers().add(user);
        podcastRepository.save(podcast);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/subscriptions")
    @ResponseBody
    public Optional<List<Podcast>> getSubscriptions(@RequestParam String username){
        System.out.println("username: "+username);

        return Optional.ofNullable(
                this.userRepository
                        .findByUserName(username)
                        .getPodcasts());
    }

}

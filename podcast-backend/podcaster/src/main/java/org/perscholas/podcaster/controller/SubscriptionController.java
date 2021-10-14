package org.perscholas.podcaster.controller;


import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.entity.User;
import org.perscholas.podcaster.repository.EpisodeRepository;
import org.perscholas.podcaster.repository.PodcastRepository;
import org.perscholas.podcaster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/unsubscribe")
    @ResponseBody
    public ResponseEntity unSubscribe(@RequestParam String username,@RequestParam Integer id ) {

        // TODO implement unsubscribe method

        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @GetMapping("/subscriptions")
    @ResponseBody
    public Optional<List<Podcast>> getSubscriptions(@RequestParam String username){
       return Optional.ofNullable(
                this.userRepository
                        .findByUserName(username)
                        .getPodcasts());
    }

    @GetMapping("/isSubscribed")
    @ResponseBody
    public boolean isSubscribed(@RequestParam String username,@RequestParam Integer id){
        System.out.println("From isSubscribed -     username:" +username + " Id: " +id);
        boolean user = userRepository
                .findByUserName(username) != null;

        boolean isSubscribed = false;
        if(user) {
            isSubscribed = this.userRepository.findByUserName(username).getPodcasts()
                    .stream().anyMatch(podcast -> podcast.getId().equals(id));

        }
        System.out.println("isSubscribed:" +isSubscribed);
        return  isSubscribed;
    }
}

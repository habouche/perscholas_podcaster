package org.perscholas.podcaster.controller;

import org.perscholas.podcaster.entity.Episode;
import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.entity.User;
import org.perscholas.podcaster.entity.UserRole;
import org.perscholas.podcaster.repository.EpisodeRepository;
import org.perscholas.podcaster.repository.PodcastRepository;
import org.perscholas.podcaster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import javax.xml.stream.events.EntityReference;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class PodcastController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EpisodeRepository episodeRepository;

    @Autowired
    private PodcastRepository podcastRepository;


    @GetMapping("/user/podcasts")
    @ResponseBody
    public List<Podcast> getAllPodcasts() {

        return this.podcastRepository.findAll();
    }

    @GetMapping("/user/podcast")
    @ResponseBody
    public Optional<Podcast> getPodcastById(@RequestParam String id) {

        return this.podcastRepository.findById(Integer.parseInt(id));
    }

    @GetMapping("/user/creator/podcasts")
    @ResponseBody
    public Set<Podcast> getPodcastsByCreator(@RequestParam String username) {

        return this.userRepository.findByUserName(username).getCreatedPodcasts();
    }


    @GetMapping("/user/podcasts/search")
    @ResponseBody
    public List<Podcast> searchPodcasts(@RequestParam(required = false) String title ) {

        return this.podcastRepository.findByTitleLike(title);
    }

    @RequestMapping("/user/podcast/episodes")
    @ResponseBody
    public List<Episode> getEpisodesByPodcastId(@RequestParam String id) {

        System.out.println("id:" +Integer.parseInt(id));

        return episodeRepository.findByPodcastId(Integer.parseInt(id));
    }

    @GetMapping("/")
    public String signin() {

        return "Auth Attempt";
    }

    /*@RequestMapping("/userRoles/{username}")
    @ResponseBody
    public User hello2(@PathVariable String username) {

        return userRepository.findByUserName(username);
        //user.getPodcasts().stream().forEach(System.out::println);
         //user.getUserRoles();
    }*/

    @RequestMapping("/podcast/{id}")
    @ResponseBody
    public Optional<Podcast> add(@PathVariable Integer id) {

        return podcastRepository.findById(id) ;
    }

    @RequestMapping("/episode/{id}")
    @ResponseBody
    public Optional<Episode> getEpisode(@PathVariable Integer id) {

        return episodeRepository.findById(id);
    }




}
package org.perscholas.podcaster.service;


import org.perscholas.podcaster.dto.PodcastForm;
import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.entity.User;
import org.perscholas.podcaster.registration.RegistrationRequest;
import org.perscholas.podcaster.repository.PodcastRepository;
import org.perscholas.podcaster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.Optional;

@Service
public class PodcastService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PodcastRepository podcastRepository;

    public ResponseEntity<Optional> addPodcast(PodcastForm podcastForm) {
        System.out.println("podcastFrom :" + podcastForm);

        //Retrieve creator
        User creator = this.userRepository.findByUserName(podcastForm.getUsername());
        //Create a new podcast
        Podcast podcast = new Podcast();
        podcast.setTitle(podcastForm.getTitle());
        podcast.setDescription(podcastForm.getDescription());
        podcast.setDateLaunched(LocalDate.now());
        podcast.setImageLink(podcastForm.getImage().getOriginalFilename());
        podcast.setLikes(0);
        podcast.setListenScore(0);
        podcast.setLanguage("English");
        podcast.setLastUpdated(LocalDate.now());
        podcast.setCreator(creator);
        /*//Add to user
        //creator.getCreatedPodcasts().add(podcast);
        this.userRepository.save(creator);*/
        // Persist podcast
        this.podcastRepository.save(podcast);
        return ResponseEntity.ok().build();
    }
    public ResponseEntity<Optional> updatePodcast(PodcastForm podcastForm) {
        System.out.println("podcastFrom :" + podcastForm);

        Podcast podcast = this.podcastRepository.getById(Integer.parseInt(podcastForm.getId()));
        //Update podcast
        podcast.setTitle(podcastForm.getTitle());
        podcast.setDescription(podcastForm.getDescription());
        podcast.setImageLink(podcastForm.getImage().getOriginalFilename());
        podcast.setLastUpdated(LocalDate.now());
        this.podcastRepository.save(podcast);
        return ResponseEntity.ok().build();
    }


}




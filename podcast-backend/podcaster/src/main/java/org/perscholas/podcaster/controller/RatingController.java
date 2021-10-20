package org.perscholas.podcaster.controller;

import org.perscholas.podcaster.dto.RatingForm;
import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.entity.Rating;
import org.perscholas.podcaster.entity.User;
import org.perscholas.podcaster.repository.PodcastRepository;
import org.perscholas.podcaster.repository.RatingRepository;
import org.perscholas.podcaster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.OptionalDouble;
import java.util.Set;

@RestController
public class RatingController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PodcastRepository podcastRepository;

    @Autowired
    private RatingRepository ratingRepository;

    @GetMapping("/user/podcast/rating")
    @ResponseBody
    public OptionalDouble getPodcastAverageRating(@RequestParam Integer id) {
        System.out.println("id : " +id);

        Set<Rating> ratings = this.podcastRepository.findById(id).get().getRatings();
        OptionalDouble average = ratings.stream().mapToInt(Rating::getRating).average();

        return average;
        //return this.podcastRepository.findRatingByPodcast(id);
    }

    @PostMapping("/user/podcast/rate")
    @ResponseBody
    public OptionalDouble ratePodcast(@ModelAttribute RatingForm ratingForm) {

        Integer userRating = getPodcastRatingByUser(ratingForm.getUsername(),ratingForm.getPodcastId());

        if(userRating != 0){
            System.out.println("podcast already rated : " +userRating);
            Optional<Rating> myRating = this.userRepository.findByUserName(ratingForm.getUsername()).getRatings().
                    stream().filter(rating -> rating.getPodcast().getId().equals(ratingForm.getPodcastId()))
                    .findAny();
            myRating.get().setRating(ratingForm.getRatingValue());
            ratingRepository.save(myRating.get());
        }else{
            System.out.println("new rating");
            Rating rating = new Rating();
            rating.setRating(ratingForm.getRatingValue());
            User user = userRepository.findByUserName(ratingForm.getUsername());
            Podcast podcast = podcastRepository.getById(ratingForm.getPodcastId());
            rating.setPodcast(podcast);
            rating.setUser(user);
            ratingRepository.save(rating);

        }
        return getPodcastAverageRating(ratingForm.getPodcastId());


    }

    @GetMapping("/user/rating")
    @ResponseBody
    public Integer getPodcastRatingByUser(@RequestParam String username, @RequestParam Integer id) {

        Optional<Rating> myRating = this.userRepository.findByUserName(username).getRatings().
                stream().filter(rating -> rating.getPodcast().getId().equals(id))
                .findAny();
        // collect(Collectors.reducing((a, b) -> null));

        return myRating.isPresent() ? myRating.get().getRating() : 0;
    }
}

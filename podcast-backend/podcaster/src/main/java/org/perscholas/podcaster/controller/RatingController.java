package org.perscholas.podcaster.controller;

import org.perscholas.podcaster.entity.Rating;
import org.perscholas.podcaster.entity.UserRole;
import org.perscholas.podcaster.repository.PodcastRepository;
import org.perscholas.podcaster.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.OptionalDouble;
import java.util.Set;

@RestController
public class RatingController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PodcastRepository podcastRepository;

    @GetMapping("/user/podcast/rating")
    @ResponseBody
    public OptionalDouble getPodcastRatings(@RequestParam Integer id) {
        System.out.println("id : " +id);

        Set<Rating> ratings = this.podcastRepository.findById(id).get().getRatings();
        OptionalDouble average = ratings.stream().mapToInt(Rating::getRating).average();

        return average;
        //return this.podcastRepository.findRatingByPodcast(id);
    }

    @GetMapping("/user/rating")
    @ResponseBody
    public Integer getPodcastRatingsByUser(@RequestParam String username, @RequestParam Integer id) {

        Rating myRating = this.userRepository.findByUserName(username).getRatings().
                stream().filter(rating -> rating.getPodcast().getId().equals(id))
                .reduce((a, b) -> {
                    throw new IllegalStateException("Multiple elements: " + a + ", " + b);
                })
                .get();
        // collect(Collectors.reducing((a, b) -> null));
        return myRating.getRating();
    }
}

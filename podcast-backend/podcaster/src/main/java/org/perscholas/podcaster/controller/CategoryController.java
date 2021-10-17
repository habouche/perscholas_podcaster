package org.perscholas.podcaster.controller;

import org.perscholas.podcaster.dto.CategoryDto;
import org.perscholas.podcaster.entity.*;
import org.perscholas.podcaster.repository.PodcastCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private PodcastCategoryRepository podcastCategoryRepository;


    @GetMapping("/user/podcasts/categories")
    @ResponseBody
    public List<PodcastCategory> getPodcastCategories() {
        return this.podcastCategoryRepository.getCategories();
    }

    @GetMapping("/user/category/nb_podcasts")
    @ResponseBody
    public Integer getNumberOfPodcastByCategory(@RequestParam String category) {
        CategoryDto categoryDto = this.podcastCategoryRepository.getNbOfPodcasts(category);
        return categoryDto.getNumberOfPodcasts();
    }

}


package org.perscholas.podcaster.repository;

import org.perscholas.podcaster.dto.CategoryDto;
import org.perscholas.podcaster.entity.PodcastCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PodcastCategoryRepository extends JpaRepository<PodcastCategory, Integer> {

    @Query("select pc from PodcastCategory pc group by category")
    List<PodcastCategory> getCategories();

    PodcastCategory findByCategory(String category);

    //@Query(value="select c.description ,c.category from podcast_categories c where c.category = :category ",nativeQuery = true)
    //List<CatDto> getNbOfPodcasts(@Param("category") String category);

    @Query(value="select count(c.category) as numberOfPodcasts,category from podcast_categories c where c.category = :category",nativeQuery = true)
    CategoryDto getNbOfPodcasts(@Param("category") String category);
}
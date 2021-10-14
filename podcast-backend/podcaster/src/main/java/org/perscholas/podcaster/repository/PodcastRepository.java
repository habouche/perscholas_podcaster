package org.perscholas.podcaster.repository;

import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface PodcastRepository extends JpaRepository<Podcast, Integer> {
    @Override
    Podcast getById(Integer integer);

    @Query("select p from Podcast p where lower(p.title) like lower(concat('%',?1,'%'))")
    List<Podcast> findByTitleLike(@Param("title")String title);

    @Query("select r from Rating r where r.podcast.id = :id")
    Set<Rating> findRatingByPodcast(@Param("id") Integer id);



}
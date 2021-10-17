package org.perscholas.podcaster.repository;

import org.perscholas.podcaster.entity.Episode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EpisodeRepository extends JpaRepository<Episode, Integer> {

    @Override
    Episode getById(Integer id);

    @Query("select e from Episode e where e.podcast.id = :id")
    List<Episode> findByPodcastId(@Param("id") Integer id);
}
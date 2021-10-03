package org.perscholas.podcaster.repository;

import org.perscholas.podcaster.entity.Episode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EpisodeRepository extends JpaRepository<Episode, Integer> {

    @Override
    Episode getById(Integer id);
}
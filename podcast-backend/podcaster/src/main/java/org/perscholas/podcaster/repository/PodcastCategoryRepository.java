package org.perscholas.podcaster.repository;

import org.perscholas.podcaster.entity.PodcastCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PodcastCategoryRepository extends JpaRepository<PodcastCategory, Integer> {
}
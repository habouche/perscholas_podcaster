package org.perscholas.podcaster.repository;

import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RatingRepository extends JpaRepository<Rating, Podcast> {
}
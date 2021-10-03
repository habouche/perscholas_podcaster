package org.perscholas.podcaster.repository;

import org.perscholas.podcaster.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
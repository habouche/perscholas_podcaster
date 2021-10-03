package org.perscholas.podcaster.entity;

import lombok.Data;

import javax.persistence.*;

@Table(name = "comments", indexes = {
        @Index(name = "FK_userr_id_idx", columnList = "user_id"),
        @Index(name = "FK_episode_id_idx", columnList = "episode_id")
})
@Entity
@Data
public class Comment {
    @Id
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(optional = false,fetch = FetchType.LAZY)
    @JoinColumn(name = "episode_id", nullable = false)
    private Episode episode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Lob
    @Column(name = "comment_content", nullable = false)
    private String commentContent;

}
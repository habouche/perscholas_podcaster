package org.perscholas.podcaster.entity;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Setter
@Getter
@Table(name = "ratings")
@IdClass(RatingID.class)
public class Rating  {

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    // @MapsId("podcastId")
    @JoinColumn(name = "podcast_id")
    private Podcast podcast;

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    // @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "rating_value", nullable = false)
    private Integer rating;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass())
            return false;

        Rating that = (Rating) o;
        return Objects.equals(podcast, that.podcast) &&
                Objects.equals(user, that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(podcast, user);
    }

    @Override
    public String toString() {
        return "Rating{" +
                "rating=" + rating +
                '}';
    }
}

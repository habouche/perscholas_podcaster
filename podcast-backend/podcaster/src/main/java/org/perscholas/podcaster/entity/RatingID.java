package org.perscholas.podcaster.entity;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
public class RatingID implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer podcast;
    private Long user;

    public RatingID(Integer podcast, Long user) {
        this.podcast = podcast;
        this.user = user;
    }

    public RatingID(){}

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RatingID ratingID = (RatingID) o;
        return Objects.equals(podcast, ratingID.podcast) && Objects.equals(user, ratingID.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(podcast, user);
    }
}

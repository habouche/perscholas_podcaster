package org.perscholas.podcaster.dto;

import lombok.Data;

@Data
public class RatingForm {

    private String username;
    private Integer podcastId;
    private Integer ratingValue;

}

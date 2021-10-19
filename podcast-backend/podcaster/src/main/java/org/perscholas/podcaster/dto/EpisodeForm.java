package org.perscholas.podcaster.dto;


import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class EpisodeForm {
    private Integer podcastId;
    private String title;
    private String description;
    private MultipartFile audio;
}

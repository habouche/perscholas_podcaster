package org.perscholas.podcaster.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Data
public class PodcastForm {

    private String username;
    private String title;
    private String description;
    //private Integer creatorId;
    private MultipartFile image;
    //private LocalDate dateLaunched;
    //private LocalDate lastUpdated;
    //private Integer listenScore;
    //private Integer likes;
    //private String language;
    //private List<String> categories = new ArrayList<>();

}

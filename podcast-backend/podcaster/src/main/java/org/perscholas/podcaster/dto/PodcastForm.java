package org.perscholas.podcaster.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Data
public class PodcastForm {

    private String id;
    private String username;
    private String title;
    private String description;
    private MultipartFile image;

}

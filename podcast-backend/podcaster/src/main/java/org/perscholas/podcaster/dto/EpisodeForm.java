package org.perscholas.podcaster.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class EpisodeForm {
    @NotNull(message="podcastId cannot be null")
    private Integer podcastId;

    @Size(min=15, message="Title size should be at least 15")
    @NotEmpty(message ="Please provide a title")
    private String title;

    @Size(min=55, message="Description size should be at least 55")
    @NotEmpty(message ="Please provide a description")
    private String description;

    @NotNull(message ="Audio file for your episode is mandatory")
    private MultipartFile audio;
}

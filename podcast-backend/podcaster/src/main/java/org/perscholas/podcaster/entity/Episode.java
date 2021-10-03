package org.perscholas.podcaster.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Table(name = "episodes", indexes = {
        @Index(name = "podcast_id_UNIQUE", columnList = "podcast_id", unique = true)
})
@Entity
@Data
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false, length = 45)
    private String title;

    @Lob
    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "audio_link", nullable = false, length = 200)
    private String audioLink;

    @Column(name = "pub_date", nullable = false)
    private LocalDate pubDate;

    @Column(name = "thumbnail", length = 100)
    private String thumbnail;

    @Column(name = "audio_length_sec")
    private Integer audioLengthSec;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "podcast_id")
    private Podcast podcast;
}
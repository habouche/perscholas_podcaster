package org.perscholas.podcaster.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.websocket.server.ServerEndpoint;
import java.time.LocalDate;
import java.util.*;

@Table(name = "podcasts", indexes = {
        @Index(name = "FK_creator_id_idx", columnList = "creator_id")
})
@Entity
@Getter
@Setter
public class Podcast {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "title", nullable = false, length = 45)
    private String title;

    @Lob
    @Column(name = "description", nullable = false)
    private String description;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    @Column(name = "image_link", length = 200)
    private String imageLink;

    @Column(name = "date_launched")
    private LocalDate dateLaunched;

    @Column(name = "last_updated")
    private LocalDate lastUpdated;

    @Column(name = "listen_score")
    private Integer listenScore;

    @Column(name = "likes")
    private Integer likes;

    @Column(name = "language", length = 45)
    private String language;

    @OneToMany(mappedBy = "podcast",cascade = CascadeType.ALL)
    private List<Episode> episodes = new ArrayList<Episode>();

    @OneToMany(mappedBy = "podcast",targetEntity = PodcastCategory.class,cascade = CascadeType.ALL)
    private Set<PodcastCategory> categories = new HashSet<>();

    @JsonIgnore
    @ManyToMany()
    @JoinTable(name = "subscriptions",
            joinColumns = @JoinColumn(name = "podcast_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> users;

    @JsonIgnore
    @OneToMany(
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            mappedBy = "podcast"
    )
    private Set<Rating> ratings = new HashSet<>();


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Podcast podcast = (Podcast) o;
        return Objects.equals(id, podcast.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Podcast{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", creator=" + creator +
                ", imageLink='" + imageLink + '\'' +
                ", dateLaunched=" + dateLaunched +
                ", lastUpdated=" + lastUpdated +
                ", listenScore=" + listenScore +
                ", likes=" + likes +
                ", language='" + language + '\'' +
                '}';
    }




}
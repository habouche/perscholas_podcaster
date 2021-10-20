package org.perscholas.podcaster;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.repository.PodcastRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.annotation.Rollback;

import java.util.List;


@DataJpaTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class PodcastRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private PodcastRepository podcastRepository;

    @Test
    @Order(1)
    @Rollback(value = false)
    public void testSaveNewPodcast() {
        //Given
        Podcast podcast = new Podcast();
        podcast.setTitle("Ferhat New Podcast");
        podcast.setDescription("Description for my Podcast");

        //When
        Podcast savedPodcast = podcastRepository.save(podcast);

        //Then
        assertThat(savedPodcast.getId()).isGreaterThan(0);
        assertThat(savedPodcast.getTitle()).isEqualTo(podcast.getTitle());
    }

    @Test
    @Order(2)
    @Rollback(value = false)
    public void testFindPodcastByTitle() {
        Podcast podcast = podcastRepository.findByTitle("Ferhat New Podcast");
        assertThat(podcast.getTitle()).isEqualTo("Ferhat New Podcast");
    }

    @Test
    @Order(3)
    @Rollback(value = false)
    public void testListPodcasts() {
        List<Podcast> podcasts = (List<Podcast>) podcastRepository.findAll();
        assertThat(podcasts).size().isGreaterThan(0);
    }

    @Test
    @Order(4)
    @Rollback(false)
    public void testUpdatePodcast() {
        Podcast podcast = podcastRepository.findByTitle("Ferhat New Podcast");
        podcast.setTitle("Ferhat New Podcast Updated");

        podcastRepository.save(podcast);

        Podcast updatedPodcast = podcastRepository.findByTitle("Ferhat New Podcast Updated");

        assertThat(updatedPodcast.getTitle()).isEqualTo("Ferhat New Podcast Updated");
    }

    @Test
    @Order(5)
    @Rollback(false)
    public void testDeletePodcast() {
        Podcast podcast = podcastRepository.findByTitle("Ferhat New Podcast Updated");

        podcastRepository.deleteById(podcast.getId());

        Podcast deletedPodcast= podcastRepository.findByTitle("Ferhat New Podcast Updated");

        assertThat(deletedPodcast).isNull();

    }
}

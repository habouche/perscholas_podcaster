package org.perscholas.podcaster.controller;


import org.apache.commons.io.FileUtils;
import org.perscholas.podcaster.dto.EpisodeForm;
import org.perscholas.podcaster.dto.PodcastForm;
import org.perscholas.podcaster.entity.Episode;
import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.repository.EpisodeRepository;
import org.perscholas.podcaster.repository.PodcastRepository;
import org.perscholas.podcaster.utils.S3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

@RestController
public class EpisodeController {

    @Autowired
    private PodcastRepository podcastRepository;

    @Autowired
    private EpisodeRepository episodeRepository;

    @Autowired
    private S3 s3;

    @PostMapping(value = "/creator/episode/add",consumes = { "multipart/form-data" })
    public ResponseEntity addEpisode(@ModelAttribute EpisodeForm episodeForm) throws IOException {

        System.out.println("episodeForm" + episodeForm);
        System.out.println("podcastId" + episodeForm.getPodcastId());

        // get the official temp directory from the OS
        String tmpdir = System.getProperty("java.io.tmpdir");
        System.out.println("Temp file path: " + tmpdir);

        // create a filename that consists of the full path of the temp dir and the original uploaded file name
        File targetFile = new File(tmpdir + File.separator + episodeForm.getAudio().getOriginalFilename());

        // commons io utility that will stream the uploaded file into the target file.
        // essenitally saves it to the hard drive.
        FileUtils.copyInputStreamToFile(episodeForm.getAudio().getInputStream(), targetFile);

        // use our S3 library to write the file to S3
        s3.writeFile("ferhat-perscholas-bucket/audios", episodeForm.getAudio().getOriginalFilename(), targetFile);
        //this.podcastService.addPodcast(podcastForm);

        Episode newEpisode = new Episode();
        newEpisode.setAudioLink(episodeForm.getAudio().getOriginalFilename());
        newEpisode.setDescription(episodeForm.getDescription());
        newEpisode.setTitle(episodeForm.getTitle());
        newEpisode.setPubDate(LocalDate.now());
        Optional<Podcast> podcast = this.podcastRepository.findById(episodeForm.getPodcastId());
        newEpisode.setPodcast(podcast.get());
        this.episodeRepository.save(newEpisode);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/creator/episode/delete")
    public ResponseEntity deleteEpisode(@RequestParam Integer episodeId) {

        System.out.println("podcastId :" +episodeId);
        Optional<Episode> toDelete = this.episodeRepository.findById(episodeId);
        if(toDelete.isPresent()){
            System.out.println("exist" +episodeId);
            Episode episode= toDelete.get();
            this.episodeRepository.deleteById(episodeId);
        }
        return ResponseEntity.ok().build();
    }


}

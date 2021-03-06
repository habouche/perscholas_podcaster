package org.perscholas.podcaster.controller;


import org.apache.commons.io.FileUtils;
import org.perscholas.podcaster.dto.PodcastForm;
import org.perscholas.podcaster.entity.Episode;
import org.perscholas.podcaster.entity.Podcast;
import org.perscholas.podcaster.repository.EpisodeRepository;
import org.perscholas.podcaster.repository.PodcastRepository;
import org.perscholas.podcaster.repository.UserRepository;
import org.perscholas.podcaster.service.PodcastService;
import org.perscholas.podcaster.utils.S3;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
public class PodcastController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EpisodeRepository episodeRepository;

    @Autowired
    private PodcastRepository podcastRepository;

    @Autowired
    private PodcastService podcastService;

   @Autowired
    private S3 s3;

    //User

    @GetMapping("/user/podcasts")
    @ResponseBody
    public List<Podcast> getAllPodcasts() {
        List<Podcast> podcasts = this.podcastRepository.findAll();
        podcasts.sort(Comparator.comparing(Podcast::getDateLaunched));
        Collections.reverse(podcasts);
        return podcasts;
    }

    @GetMapping("/user/podcast")
    @ResponseBody
    public Optional<Podcast> getPodcastById(@RequestParam String id) {

        return this.podcastRepository.findById(Integer.parseInt(id));
    }

    @GetMapping("/user/creator/podcasts")
    @ResponseBody
    public Set<Podcast> getPodcastsByCreator(@RequestParam String username) {

        return this.userRepository.findByUserName(username).getCreatedPodcasts();
    }

    @GetMapping("/user/podcasts/search")
    @ResponseBody
    public List<Podcast> searchPodcasts(@RequestParam(required = false) String title ) {

        return this.podcastRepository.findByTitleLike(title);
    }

    @RequestMapping("/user/podcast/episodes")
    @ResponseBody
    public List<Episode> getEpisodesByPodcastId(@RequestParam String id) {

        System.out.println("id:" +Integer.parseInt(id));

        return episodeRepository.findByPodcastId(Integer.parseInt(id));
    }

    //Creator
    //Add a new podcast
    @PostMapping(value = "/creator/podcast/add",consumes = { "multipart/form-data" })
    public ResponseEntity addPodcast(@ModelAttribute PodcastForm podcastForm) throws IOException {

        // get the official temp directory from the OS
        String tmpdir = System.getProperty("java.io.tmpdir");
        System.out.println("Temp file path: " + tmpdir);

        // create a filename that consists of the full path of the temp dir and the original uploaded file name
        File targetFile = new File(tmpdir + File.separator + podcastForm.getImage().getOriginalFilename());

        // commons io utility that will stream the uploaded file into the target file.
        // essenitally saves it to the hard drive.
        FileUtils.copyInputStreamToFile(podcastForm.getImage().getInputStream(), targetFile);

        // use our S3 library to write the file to S3
        s3.writeFile("ferhat-perscholas-bucket/images", podcastForm.getImage().getOriginalFilename(), targetFile);
        this.podcastService.addPodcast(podcastForm);
        return ResponseEntity.ok().build();
    }

    //Update a podcast
    @PutMapping(value = "/creator/podcast/update",consumes = { "multipart/form-data" })
    public ResponseEntity updatePodcast(@ModelAttribute PodcastForm podcastForm) throws IOException{

        // get the official temp directory from the OS
        String tmpdir = System.getProperty("java.io.tmpdir");
        System.out.println("Temp file path: " + tmpdir);

        // create a filename that consists of the full path of the temp dir and the original uploaded file name
        File targetFile = new File(tmpdir + File.separator + podcastForm.getImage().getOriginalFilename());

        // commons io utility that will stream the uploaded file into the target file.
        // essenitally saves it to the hard drive.
        FileUtils.copyInputStreamToFile(podcastForm.getImage().getInputStream(), targetFile);

        // use our S3 library to write the file to S3
        s3.writeFile("ferhat-perscholas-bucket/images", podcastForm.getImage().getOriginalFilename(), targetFile);
        this.podcastService.updatePodcast(podcastForm);
        return ResponseEntity.ok().build();
    }

    //Delete a podcast // TODO : deletion not working properly need to be fixed
    @Transactional
    @DeleteMapping(value = "/creator/podcast/delete")
    public ResponseEntity deletePodcast(@RequestParam Integer podcastId){
        System.out.println("podcastId :" +podcastId);
        Optional<Podcast> toDelete = this.podcastRepository.findById(podcastId);
        if(toDelete.isPresent()){
            System.out.println("exist" +podcastId);
            Podcast podcast= toDelete.get();
            this.podcastRepository.deleteById(podcastId);
        }
        return ResponseEntity.ok().build();
    }


}
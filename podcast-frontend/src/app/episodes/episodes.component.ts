import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode, Podcast } from '../podcasts/podcasts.component';
import { PodcastService } from '../service/podcast.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css'],
})
export class EpisodesComponent implements OnInit {
  episodes: Episode[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private podcastService: PodcastService
  ) {}

  ngOnInit(): void {
    this.getEpisodesByPodcastId();
  }

  getEpisodesByPodcastId(): void {
    const id = this.route.snapshot.params.podcast;
    this.podcastService.getAPodcastEpisodesById(id).subscribe(
      (response) => {
        this.episodes = response;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }
}

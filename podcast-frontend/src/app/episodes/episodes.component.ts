import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode, Podcast } from '../podcasts/podcasts.component';
import { PodcastService } from '../service/podcast.service';
import { AngMusicPlayerComponent } from 'ang-music-player';

export class Audio {
  constructor(public url: string, public title: string, public cover: string) {}
}

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css'],
})
export class EpisodesComponent implements OnInit {
  episodes: Episode[];
  podcast: Podcast;
  // audioList: Audio[] = new Audio()[];
  audioList: Audio[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private podcastService: PodcastService
  ) {}

  ngOnInit(): void {
    this.getPodcastById();
    this.getEpisodesByPodcastId();
    // console.log('episode:' + JSON.stringify(this.episodes));

    // console.log('audios: ' + JSON.stringify(this.audioList));
  }

  play(): void {
    console.log('play');
  }

  getPodcastById(): void {
    const id = this.route.snapshot.params.podcast;
    this.podcastService.getPodcastById(id).subscribe(
      (response) => {
        this.podcast = response;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  getEpisodesByPodcastId(): void {
    const id = this.route.snapshot.params.podcast;
    this.podcastService.getPodcastEpisodesById(id).subscribe(
      (response) => {
        this.episodes = response;
        this.episodes.forEach((episode) => {
          // console.log('episode:' + JSON.stringify(episode));
          this.audioList.push(new Audio(episode.audioLink, episode.title, ''));
        });
        console.log('audios:' + JSON.stringify(this.audioList));
        // this.audioList = JSON.stringify(this.audioList);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }
}

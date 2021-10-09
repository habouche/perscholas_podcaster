import { Component, OnInit } from '@angular/core';
import { PodcastService } from '../service/podcast.service';
import { CreatorService } from '../service/creator.service';
import { Podcast } from '../podcasts/podcasts.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creator-podcasts',
  templateUrl: './creator-podcasts.component.html',
  styleUrls: ['./creator-podcasts.component.css'],
})
export class CreatorPodcastsComponent implements OnInit {
  podcasts: Podcast[];
  message: string;

  constructor(
    private podcastService: PodcastService,
    private creatorService: CreatorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPodcasts();
  }

  getPodcasts(): void {
    this.creatorService
      .getPodcastsByCreator(sessionStorage.getItem('authenticatedUser'))
      .subscribe((response) => {
        this.podcasts = response;
      });
  }

  // deletePodcast(id): void {
  //   this.podcastService.deletePodcast(id).subscribe((response) => {
  //     this.message = `Delete of Podcast ${id} is susscesful`;
  //     this.getPodcasts();
  //   });
  // }

  updatePodcast(id): void {
    this.router.navigate(['myepisodes', id]);
  }

  addPodcast(): void {
    this.router.navigate(['myepisodes', -1]);
  }
}

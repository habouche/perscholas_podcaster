import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { PodcastService } from '../service/podcast.service';
import { SearchService } from '../service/data/search.service';

export class User {
  constructor(
    public id: number,
    public userName: string,
    public email: string,
    public dateOfBirth: Date,
    public phone: string,
    public fullName: string,
    public roles: Role[],
    public createdPodcasts: Podcast[]
  ) {}
}

export class Role {
  constructor(
    public id: number,
    public userRole: string,
    public email: string,
    public user: User
  ) {}
}

export class PodcastCategory {
  constructor(
    public id: number,
    public category: string,
    public podcast: Podcast
  ) {}
}

export class Episode {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public audioLink: string,
    public pubDate: string,
    public podcast: Podcast
  ) {}
}

export class Podcast {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public imageLink: string,
    public dateLaunched: Date,
    public lastUpdated: Date,
    public listenScore: number,
    public likes: number,
    public language: string,
    public user: User[],
    public creator: User,
    public episodes: Episode[],
    public categories: PodcastCategory[]
  ) {}
}

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.css'],
})
export class PodcastsComponent implements OnInit {
  searchWord: string;
  podcasts: Podcast[];
  text: string;
  constructor(
    private podcastService: PodcastService,
    private httpClient: HttpClient,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // this.getAllPodcasts();
    this.searchService.currentMessage.subscribe((message) => {
      this.searchWord = message;
      if (this.searchWord.length === 0) {
        this.getAllPodcasts();
      } else {
        this.searchPodcasts();
      }
    });
  }

  getAllPodcasts(): void {
    this.podcastService.getAllPodcasts().subscribe(
      (response) => {
        this.podcasts = response;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  searchPodcasts(): void {
    console.log('search called');
    this.podcastService.searchPodcasts(this.searchWord).subscribe(
      (response) => {
        console.log(JSON.stringify(response));
        this.podcasts = response;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }
}

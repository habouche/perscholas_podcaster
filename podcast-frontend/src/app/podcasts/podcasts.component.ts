import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { PodcastService } from '../service/podcast.service';
import { SearchService } from '../service/data/search.service';
import { first, shareReplay, take, map } from 'rxjs/operators';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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
  @Input() context = 'podcasts';
  searchWord: string;
  @Input() podcasts: Podcast[];
  text: string;
  categoryParameter: string;
  constructor(
    private podcastService: PodcastService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.categoryParameter = this.route.snapshot.params.category;
    if (this.categoryParameter != null) {
      this.context = 'categories';
    }
    // this.getAllPodcasts();
    // console.log('category : ' + this.categoryParameter);
    this.searchService.currentMessage.subscribe((message) => {
      this.searchWord = message;
      if (this.searchWord.length === 0) {
        if (this.context === 'podcasts') {
          this.getAllPodcasts();
          console.log('loaded podcasts 1:' + this.podcasts);
        } else if (this.categoryParameter != null) {
          console.log('category : ' + this.categoryParameter);
          this.getAllPodcasts();
          setTimeout(() => {
            this.podcasts = this.filterPodcasts(this.podcasts);
          }, 2000);
        }
      } else {
        this.searchPodcasts();
      }
    });
  }

  sleep(ms): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  filterPodcasts(podcasts: any): Podcast[] {
    if (podcasts.length > 0) {
      console.log(JSON.stringify(podcasts));
      return podcasts.filter((podcast) => {
        return podcast.categories.some((cat) => {
          return cat.category === this.categoryParameter;
        });
      });
    }
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

  subscribe(): void {
    console.log('from subscribe method');
  }
}

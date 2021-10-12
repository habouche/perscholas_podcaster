import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Podcast } from '../podcasts/podcasts.component';
import { PodcastService } from '../service/podcast.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.css'],
})
export class PodcastComponent implements OnInit {
  @Input() podcast: Podcast;
  isSubscribedTo$: Observable<boolean>;
  isSubscribedTo: boolean;

  constructor(
    public podcastService: PodcastService,
    private http: HttpClient,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.isSubscribedTo$ = this.podcastService.isSubscribed(
      this.podcast.id.toString()
    );
    this.isSubscribedTo$.subscribe(
      (response) => {
        console.log('response in component:' + response);
        this.isSubscribedTo = response;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  subscribe(): void {
    console.log('from subscribe method');
    this.podcastService
      .subscribeToPodcast(
        this.podcast.id,
        sessionStorage.getItem('authenticatedUser')
      )
      .subscribe(
        (response) => {
          console.log('data:' + JSON.stringify(response));
          this.isSubscribedTo = true;
          // this.route.navigate(['podcasts']);
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
  }
}

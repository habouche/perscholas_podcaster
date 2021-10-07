import { Component, Input, OnInit } from '@angular/core';
import { Podcast, User } from '../podcasts/podcasts.component';
import { CreatorService } from '../service/creator.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
})
export class CreatorComponent implements OnInit {
  createdPodcasts: Podcast[];
  @Input() user: User;

  constructor(private creatorService: CreatorService) {}

  ngOnInit(): void {
    this.getPodcasts();
  }

  getPodcasts(): void {
    this.creatorService.getPodcastsByCreator(this.user.userName).subscribe(
      (response) => {
        this.createdPodcasts = response;
        console.log('user: ' + JSON.stringify(this.createdPodcasts));
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }
}

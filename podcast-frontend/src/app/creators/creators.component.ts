import { Component, OnInit } from '@angular/core';
import { User } from '../podcasts/podcasts.component';
import { Podcast } from '../podcasts/podcasts.component';
import { CreatorService } from '../service/creator.service';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.css'],
})
export class CreatorsComponent implements OnInit {
  constructor(private creatorService: CreatorService) {}

  users: User[];
  searchWord: string;

  ngOnInit(): void {
    this.getCreators();
  }

  searchCreator(): void {
    this.creatorService.searchCreator(this.searchWord).subscribe(
      (response) => {
        if (response.length === 0 && this.searchWord.length > 0) {
          this.users = null;
        } else {
          if (response.length === 0 && this.searchWord.length === 0) {
            this.getCreators();
          } else {
            this.users = response;
          }
        }
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  getCreators(): void {
    this.creatorService.getCreators().subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }
}

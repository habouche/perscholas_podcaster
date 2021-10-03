import { Component, OnInit } from '@angular/core';
import { User } from '../podcasts/podcasts.component';
import { CreatorService } from '../service/creator.service';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.css'],
})
export class CreatorsComponent implements OnInit {
  constructor(private creatorService: CreatorService) {}

  users: User[];

  ngOnInit(): void {
    this.getCreators();
  }

  getCreators(): void {
    this.creatorService.getCreators().subscribe(
      (response) => {
        this.users = response;
        console.log('user: ' + JSON.stringify(this.users));
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }
}

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { SearchService } from '../service/data/search.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  searchWord: string;
  isUserACreator: boolean;
  isUserACreator$: Observable<boolean>;
  // isacreator;
  // @Output() searchCriteria = new EventEmitter<string>();

  constructor(
    public hardcodedAuthenticationService: HardcodedAuthenticationService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchService.currentMessage.subscribe(
      (message) => (this.searchWord = message)
    );
    this.isUserACreator$ = this.hardcodedAuthenticationService.isCreator();

    this.isUserACreator$.subscribe(
      (response) => {
        // console.log('response in component:' + response);
        this.isUserACreator = response;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  searchThis(): void {
    this.searchService.changeMessage(this.searchWord);
  }

  // isCreator(): void {
  //   // let isCreator: boolean;
  //   this.hardcodedAuthenticationService.isCreator().subscribe(
  //     (response) => {
  //       console.log('response in component:' + response);
  //       this.isUserACreator = response;
  //     },
  //     (error) => {
  //       console.log(JSON.stringify(error));
  //     }
  //   );
  //   // sub.unsubscribe();
  // }
}

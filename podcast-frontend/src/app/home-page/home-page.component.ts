import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { SearchService } from '../service/data/search.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  searchWord: string;
  // @Output() searchCriteria = new EventEmitter<string>();

  constructor(
    public hardcodedAuthenticationService: HardcodedAuthenticationService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.searchService.currentMessage.subscribe(
      (message) => (this.searchWord = message)
    );
  }

  searchThis(): void {
    this.searchService.changeMessage(this.searchWord);
  }
}

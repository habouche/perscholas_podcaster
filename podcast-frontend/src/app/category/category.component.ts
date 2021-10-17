import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PodcastCategory } from '../podcasts/podcasts.component';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @Input() category: PodcastCategory;
  numberOfPodcasts$: Observable<any>;
  numberOfPodcasts: any;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.numberOfPodcasts$ = this.categoryService.getNumberOfPodcastsd(
      this.category.category
    );

    this.numberOfPodcasts$.subscribe(
      (response) => {
        this.numberOfPodcasts = response;
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }

  //   getNumberOfPodcasts(category: string): number {
  //     let numberOfPodcasts;
  //     this.categoryService.getNumberOfPodcastsd(category).subscribe(
  //       (response) => {
  //         numberOfPodcasts = response.numberOfPodcasts;
  //       },
  //       (error) => {}
  //     );
  //     return numberOfPodcasts;
  //   }
}

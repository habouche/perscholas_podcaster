import { Component, OnInit } from '@angular/core';
import { PodcastCategory } from '../podcasts/podcasts.component';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: PodcastCategory[];
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (response) => {
        this.categories = response;
        console.log('categories : ' + JSON.stringify(this.categories));
      },
      (error) => {}
    );
  }
}

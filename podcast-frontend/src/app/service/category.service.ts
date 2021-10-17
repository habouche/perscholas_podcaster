import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PodcastCategory } from '../podcasts/podcasts.component';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<PodcastCategory[]> {
    return this.http
      .get<any>('http://localhost:8080/user/podcasts/categories')
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getNumberOfPodcastsd(category: string): Observable<any> {
    const options = category
      ? { params: new HttpParams().set('category', category) }
      : {};
    return this.http.get<any>(
      'http://localhost:8080/user/category/nb_podcasts',
      options
    );
    // .pipe(
    //   map((response) => {
    //     return response;
    //   })
    // );
  }
}

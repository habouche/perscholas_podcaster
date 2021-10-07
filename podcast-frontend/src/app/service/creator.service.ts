import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Podcast, User } from '../podcasts/podcasts.component';

@Injectable({
  providedIn: 'root',
})
export class CreatorService {
  constructor(private http: HttpClient) {}

  getCreators(): Observable<User[]> {
    return this.http.get<any>('http://localhost:8080/user/creators').pipe(
      map((response) => {
        console.log('creators:' + JSON.stringify(response));
        return response;
      })
    );
  }

  getPodcastsByCreator(username: string): Observable<Podcast[]> {
    const options = username
      ? { params: new HttpParams().set('username', username) }
      : {};
    return this.http
      .get<any>('http://localhost:8080/user/creator/podcasts', options)
      .pipe(
        map((response) => {
          console.log('podcasts:' + JSON.stringify(response));
          return response;
        })
      );
  }

  searchCreator(searchWord: string): Observable<User[]> {
    const options = searchWord
      ? { params: new HttpParams().set('username', searchWord) }
      : {};
    return this.http
      .get<any>('http://localhost:8080/user/creators/search', options)
      .pipe(
        map((response) => {
          console.log('podcasts:' + JSON.stringify(response));
          return response;
        })
      );
  }
}

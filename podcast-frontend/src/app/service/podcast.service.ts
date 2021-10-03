import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode, Podcast } from '../podcasts/podcasts.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PodcastService {
  constructor(private http: HttpClient) {}

  getAllPodcasts(): Observable<Podcast[]> {
    return this.http.get<any>('http://localhost:8080/user/podcasts').pipe(
      map((response) => {
        return response;
      })
    );
  }

  getAPodcastEpisodesById(podcastiId: string): Observable<Episode[]> {
    const options = podcastiId
      ? { params: new HttpParams().set('id', podcastiId) }
      : {};
    return this.http
      .get<any>('http://localhost:8080/user/podcast/episodes', options)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  searchPodcasts(searchWord: string): Observable<Podcast[]> {
    const options = searchWord
      ? { params: new HttpParams().set('title', searchWord) }
      : {};

    return this.http
      .get<Podcast[]>('http://localhost:8080/user/podcasts/search', options)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}

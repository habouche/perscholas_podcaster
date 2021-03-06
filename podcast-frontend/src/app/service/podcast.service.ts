import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode, Podcast } from '../podcasts/podcasts.component';
import { map, take } from 'rxjs/operators';
import { PodcastFrom } from '../creator-podcast/creator-podcast.component';

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

  getAvergaeRating(id: any): Observable<number> {
    const options = id ? { params: new HttpParams().set('id', id) } : {};
    return this.http
      .get<any>('http://localhost:8080/user/podcast/rating', options)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getMyRating(id: any, username: string): Observable<number> {
    const options = id
      ? { params: new HttpParams().set('id', id).set('username', username) }
      : {};
    return this.http
      .get<any>('http://localhost:8080/user/rating', options)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  ratePodcast(
    username: string,
    podcastId: number,
    ratingValue: number
  ): Observable<number> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('podcastId', podcastId.toString());
    formData.append('ratingValue', ratingValue.toString());
    return this.http
      .post<any>('http://localhost:8080/user/podcast/rate', formData)
      .pipe(
        map((data) => {
          console.log('average podcast rating:' + JSON.stringify(data));
          return data;
        })
      );
  }

  subscribeToPodcast(id: number, username: string): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('username', username);
    const sub = { id, username };
    console.log(JSON.stringify(sub));
    return this.http
      .post<any>('http://localhost:8080/user/subscribe', formData)
      .pipe(
        map((data) => {
          console.log('data:' + JSON.stringify(data));
          return data;
        })
      );
  }

  unsubscribeFromPodcast(id: number, username: string): Observable<any> {
    const formData = new FormData();
    formData.append('id', id.toString());
    formData.append('username', username);
    const sub = { id, username };
    console.log(JSON.stringify(sub));
    return this.http
      .post<any>('http://localhost:8080/user/unsubscribe', formData)
      .pipe(
        map((data) => {
          console.log('data:' + JSON.stringify(data));
          return data;
        })
      );
  }

  getPodcastById(podcastiId: any): Observable<Podcast> {
    const options = podcastiId
      ? { params: new HttpParams().set('id', podcastiId) }
      : {};
    return this.http
      .get<any>('http://localhost:8080/user/podcast', options)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getPodcastEpisodesById(podcastiId: string): Observable<Episode[]> {
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

  isSubscribed(id: string): Observable<boolean> {
    const options = id
      ? {
          params: new HttpParams()
            .set('id', id)
            .set('username', sessionStorage.getItem('authenticatedUser')),
        }
      : {};
    return this.http.get<boolean>(
      'http://localhost:8080/user/isSubscribed',
      options
    );
    // .pipe(
    //   map((response) => {
    //     console.log('callback httpGet');
    //     return response;
    //   })
    // );
  }

  // Podcast CRUD Operations

  updatePodcast(podcastForm: any): Observable<any> {
    console.log(podcastForm);
    return this.http
      .put<any>('http://localhost:8080/creator/podcast/update', podcastForm)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  createPodcast(podcastForm: any): Observable<any> {
    // const options = username
    //   ? { params: new HttpParams().set('username', username) }
    //   : {};
    return this.http
      .post<any>(
        'http://localhost:8080/creator/podcast/add',

        podcastForm
      )
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  deletePodcast(podcastId: any): Observable<any> {
    const options = podcastId
      ? { params: new HttpParams().set('podcastId', podcastId) }
      : {};
    return this.http
      .delete<any>('http://localhost:8080/creator/podcast/delete', options)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}

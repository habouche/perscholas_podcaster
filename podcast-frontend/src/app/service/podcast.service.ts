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
      .post<any>('http://localhost:8080/user/unSubscribe', formData)
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

  updatePodcast(arg0: string, id: number, podcast: Podcast): Observable<any> {
    throw new Error('Method not implemented.');
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

  // deleteTodo(id: any) {
  //   throw new Error('Method not implemented.');
  // }
}

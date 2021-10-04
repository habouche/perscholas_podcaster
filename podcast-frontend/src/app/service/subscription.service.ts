import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Podcast } from '../podcasts/podcasts.component';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  constructor(private http: HttpClient) {}

  getSubscriptions(username: string): Observable<Podcast[]> {
    const options = username
      ? { params: new HttpParams().set('username', username) }
      : {};
    return this.http
      .get<any>('http://localhost:8080/user/subscriptions', options)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}

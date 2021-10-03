import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../podcasts/podcasts.component';

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
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  constructor(private http: HttpClient) {}

  addEpisode(epiosdeForm: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:8080/creator/episode/add', epiosdeForm)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}

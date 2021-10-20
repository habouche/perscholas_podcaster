import { HttpClient, HttpParams } from '@angular/common/http';
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

  updateEpisode(epiosdeForm: any): Observable<any> {
    return this.http
      .put<any>('http://localhost:8080/creator/episode/update', epiosdeForm)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  deleteEpisode(episodeId: any): Observable<any> {
    const options = episodeId
      ? { params: new HttpParams().set('episodeId', episodeId) }
      : {};
    return this.http
      .delete<any>('http://localhost:8080/creator/episode/delete', options)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAuthenticationService {
  constructor(private http: HttpClient, private route: Router) {}

  API_URL = 'http//:localhost:8080';

  authenticate(username: string, password: string): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const login = { username, password };
    return this.http
      .post<any>('http://localhost:8080/authenticate', { username, password })
      .pipe(
        map((data) => {
          sessionStorage.setItem('authenticatedUser', username);
          sessionStorage.setItem('token', `Bearer ${data.token}`);
          return data;
        })
      );
  }

  register(signUpForm: any): Observable<any> {
    return this.http
      .post<any>('http://localhost:8080/register', signUpForm)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAuthenticatedUser(): string {
    return sessionStorage.getItem('authenticatedUser');
  }
  getAuthenticatedToken(): string {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem('token');
    }
  }

  isCreator(): Observable<boolean> {
    const options = {
      params: new HttpParams().set('username', this.getAuthenticatedUser()),
    };
    return this.http
      .get<boolean>('http://localhost:8080/user/isCreator', options)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout(): void {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('token');
    this.route.navigate(['login']);
  }

  isACreator(): boolean {
    const isCreator = sessionStorage.getItem('isCreator');
    return Boolean(JSON.parse(isCreator));
  }
}

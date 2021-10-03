import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAuthenticationService {
  constructor(private http: HttpClient) {}

  API_URL = 'http//:localhost:8080';

  authenticate(username: string, password: string): Observable<any> {
    // const basicAuthHeaderString =
    //   'Basic ' + window.btoa(username + ':' + password);
    // const headers = new HttpHeaders({ Authorization: basicAuthHeaderString });
    const headers = { 'content-type': 'application/json' };
    const login = { username, password };
    return this.http
      .post<any>('http://localhost:8080/authenticate', { username, password })
      .pipe(
        map((data) => {
          console.log('data:' + JSON.stringify(data));
          sessionStorage.setItem('authenticatedUser', username);
          sessionStorage.setItem('token', `Bearer ${data.token}`);
          return data;
        })
      );
  }

  register(signUpForm: any): Observable<any> {
    // const basicAuthHeaderString =
    //   'Basic ' + window.btoa(username + ':' + password);
    // const headers = new HttpHeaders({ Authorization: basicAuthHeaderString });
    // const headers = { 'content-type': 'application/json' };
    // const login = { username, password };
    return this.http
      .post<any>('http://localhost:8080/register', signUpForm)
      .pipe(
        map((response) => {
          console.log('data:' + JSON.stringify(response));
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

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('authenticatedUser');
    return !(user === null);
  }

  logout(): void {
    sessionStorage.removeItem('authenticatedUser');
    sessionStorage.removeItem('token');
  }
}

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HardcodedAuthenticationService } from '../hardcoded-authentication.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private hardcodedAuthenticationService: HardcodedAuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const username = 'ferhat';
    // const password = 'ferhat';
    // const basicAuthHeaderString =
    //   'Basic ' + window.btoa(username + ':' + password);
    const JWTAuthHeaderString =
      this.hardcodedAuthenticationService.getAuthenticatedToken();
    const username = this.hardcodedAuthenticationService.getAuthenticatedUser();
    if (JWTAuthHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: JWTAuthHeaderString,
        },
      });
    }
    return next.handle(request);
  }
}

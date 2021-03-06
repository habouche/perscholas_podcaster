import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = false;
  isUserACreator: boolean;
  isUserACreator$: Observable<boolean>;

  model: any = {};

  constructor(
    private route: Router,
    private hardcodedAuthentificationService: HardcodedAuthenticationService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    console.log('Loggind Attempt');
  }

  handleLogin(): void {
    this.hardcodedAuthentificationService
      .authenticate(this.username, this.password)
      .subscribe(
        (response) => {
          console.log('data:' + JSON.stringify(response));
          sessionStorage.setItem('authenticatedUser', this.username);
          this.isCreator();
          this.route.navigate(['podcasts']);
          this.invalidLogin = false;
        },
        (error) => {
          console.log(JSON.stringify(error));
          this.invalidLogin = true;
        }
      );
  }

  isCreator(): void {
    this.isUserACreator$ = this.hardcodedAuthentificationService.isCreator();

    this.isUserACreator$.subscribe(
      (response) => {
        // console.log('response in component:' + response);
        // this.isUserACreator = response;
        sessionStorage.setItem('isCreator', String(response));
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  }
}

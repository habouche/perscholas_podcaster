import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

export class SignupFrom {
  constructor(
    public fullName: string,
    public userName: string,
    public email: string,
    public password: string,
    public role: string
  ) {}
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupFrom: SignupFrom;
  signUpError: boolean;
  passwordError =
    'Password must be between 6 and 20 characters and contain at least one numeric digit' +
    ' one uppercase and one lowercase letter!';
  signUpErrorMessage = 'Email already used';
  constructor(
    private route: Router,
    private hardcodedAuthentificationService: HardcodedAuthenticationService,
    private httpClient: HttpClient
  ) {}

  ngOnInit(): void {
    this.signupFrom = new SignupFrom('', '', '', '', '');
  }

  regiter(): void {
    this.hardcodedAuthentificationService.register(this.signupFrom).subscribe(
      (response) => {
        this.route.navigate(['podcasts']);
        this.signUpError = false;
      },
      (error) => {
        console.log('servererror ' + JSON.stringify(error));
        this.signUpError = true;
      }
    );
  }
}

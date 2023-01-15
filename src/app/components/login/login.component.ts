import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import {LoginuserService} from "../../service/authentication/loginuser.service";
import {BehaviorSubject} from "rxjs";
import {SignupuserService} from "../../service/authentication/signupuser.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: String = "";
  successMessage: String = "";
  user: User;
  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();
  userNameSubject = new BehaviorSubject<String>("");
  userLogged = this.userNameSubject.asObservable();
  role: String = "CLIENT";
  jwt!: any;

  constructor(private authService: LoginuserService,private signUpService:SignupuserService, private router: Router,private jwtHelper:JwtHelperService) {
    this.user = new User();
  }

  ngOnInit(): void {
    if (this.authService.isLogedIn()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    this.authService.signIn(this.user).subscribe(
      (response) => {
        if (response instanceof HttpErrorResponse) {
          this.errorMessage = response.error.error;
          console.log(this.errorMessage)
        } else {
          this.errorMessage = "";
          this.successMessage = "you are connected";
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['']);
          }, 2500);
        }
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

  OnSubmit() {
    this.signUpService.SignUp(this.user).subscribe(
      (response) => {
        if (response instanceof HttpErrorResponse) {
          this.errorMessage = response.error;
        } else {
          this.errorMessage = "";
          this.successMessage = "your account have been signed Up";
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/login']);
          }, 2500);
        }
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
  isLogedIn(): boolean {
    const token = localStorage.getItem('access_token');
    if(token!=null){
      const user = this.jwtHelper.decodeToken(token).user_name
      this.userNameSubject.next(user)
    }
    const isLoggedIn = !this.jwtHelper.isTokenExpired(token);
    this.isLoggedInSubject.next(isLoggedIn);

    return isLoggedIn;
  }

}

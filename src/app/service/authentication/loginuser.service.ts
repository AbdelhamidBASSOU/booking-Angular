import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from "@angular/common/http";
import {User} from "../../model/user";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {IdToken} from "../../model/id-token";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();
  userNameSubject = new BehaviorSubject<String>("");
  userLogged = this.userNameSubject.asObservable();
  private refreshTokenInterval:any;
  role!:String;
  constructor(private http:HttpClient,private route:Router,private jwtHelper:JwtHelperService) { }

  signIn(user:User):Observable<IdToken|HttpErrorResponse>{
    const params = new HttpParams()
      .set('username', user.username.toString()).set('password',user.password.toString());
    return this.http.post<IdToken>("http://localhost:8081/login",params).pipe(
      tap(response => {
        localStorage.setItem("access_token", response.accessToken.toString());
        localStorage.setItem("refresh_token", response.refreshToken.toString());
        this.isLoggedInSubject.next(true);
        const accessToken = localStorage.getItem("access_token");
        // @ts-ignore
        let jwt = this.jwtHelper.decodeToken(accessToken.toString());
        this.userNameSubject.next(jwt.username);
        this.startRefreshTokenInterval();
      })
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


  logout(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    this.isLoggedInSubject.next(false);
    this.userNameSubject.next("")
    this.stopRefreshTokenInterval();
    this.route.navigate(['/login']);
  }

  startRefreshTokenInterval(){
    this.refreshTokenInterval = setInterval(() => {
    }, 100000);
  }

  stopRefreshTokenInterval(){
    clearInterval(this.refreshTokenInterval);
  }

}

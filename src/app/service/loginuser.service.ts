import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginuserService {
private  baseUrl="http://localhost:8081/login";
  constructor(private httpClient:HttpClient) { }
  loginUser(user: User):Observable<object>{
    let body = new URLSearchParams();
    body.set('username', user.username.toString());
    body.set('password', user.password.toString());

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    return this.httpClient.post(`${this.baseUrl}`,body , options);
  }
}

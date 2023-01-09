import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignupuserService {
  private  baseUrl="http://localhost:8081/api/v1/users/add";
  constructor(private httpClient:HttpClient) { }
  signupUser(user: User):Observable<object>{

    return this.httpClient.post(`${this.baseUrl}`,user);
  }

}

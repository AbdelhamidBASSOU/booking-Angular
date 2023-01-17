import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {User} from "../../model/user";
import {catchError, Observable, of, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SignupuserService {
  private  baseUrl="http://localhost:8081/api/v1/users/add";
  role!:String;
  constructor(private http:HttpClient) { }
  SignUp(user:User):Observable<User | HttpErrorResponse>{
    return this.http.post<User>(this.baseUrl,user).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error("Error: ", error.error);
          return of(error);
        } else {
          return throwError(error);
        }
      })
    );
  }

}

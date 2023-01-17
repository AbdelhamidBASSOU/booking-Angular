import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders,HttpParams} from "@angular/common/http";
import {catchError, Observable, of, throwError} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Reservation} from "../../model/reservation";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  public host:string="http://localhost:8081/api/v1";
  constructor(private http:HttpClient,private jwt:JwtHelperService) { }

  // @ts-ignore
  addReservation(reservation:Reservation):Observable<Reservation|HttpErrorResponse>{
    const access_token = localStorage.getItem("access_token");
    if (access_token!=null){
      const headers = new HttpHeaders().set("Authorization","Bearer "+access_token);
      return this.http.post<Reservation>(this.host + "/Reservation/add", reservation,{headers}).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error("Error: ", error.error);
            return of(error);
          }else {
            if (error.status === 403){
              console.log(error)
            }
            return throwError(error);
          }
        })
      );
    }
  }
  getUserReservation(user:User):Observable<Reservation[]|HttpErrorResponse>{
    const access_token = localStorage.getItem("access_token");
    if (access_token!=null && !this.jwt.isTokenExpired(access_token)){
      const headers = new HttpHeaders().set("Authorization","Bearer "+access_token);
      return this.http.post<Reservation[]>(this.host + "/Reservation/reservations",user,{headers}).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error("Error: ", error.error);
            return of(error);
          }else {
            if (error.status === 403){
              console.log(error)
              return of(error);
            }
            return throwError(error);
          }
        })
      );
    }
    return of([]);
  }
}

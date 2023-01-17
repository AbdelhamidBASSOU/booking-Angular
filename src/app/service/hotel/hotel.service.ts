import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Hotel} from "../../model/hotel";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private  baseUrl="http://localhost:8081/api/v1/hotel/";
  constructor(private http:HttpClient) { }
  public getHotels():Observable<Hotel[]>{
    return this.http.get<Hotel[]>(this.baseUrl);
  }
  public getHotelById(id:BigInt):Observable<Hotel>{
    return this.http.get<Hotel>("http://localhost:8081/api/v1/hotel/id/"+id);
  }
}

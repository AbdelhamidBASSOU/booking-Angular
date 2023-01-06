import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private http:HttpClient) { }

  public generateToken(request: any){
    return this.http.post("http://localhost:8081/login",request,{responseType: 'text' as 'json'});
  }
  public welcome(token: string){
    let tokenStr='bearer '+token;
    const headers =new HttpHeaders().set("Authorization",tokenStr);
    return this.http.get("http://localhost:8081/",{headers,responseType: 'text' as 'json'});
  }
}

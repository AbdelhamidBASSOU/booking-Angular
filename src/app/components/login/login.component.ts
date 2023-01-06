import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JwtClientService} from "../../jwt-client.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username!: string;
  password!: string;
  constructor(private service:JwtClientService) { }



  public getAccessToken(){

  }
  // noinspection JSDeprecatedSymbols
  onSignIn(){


  }
  onSignUp(){

  }

  ngOnInit(): void {
  }

}

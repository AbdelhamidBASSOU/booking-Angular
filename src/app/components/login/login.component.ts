import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {LoginuserService} from "../../service/loginuser.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

user: User= new User();


  constructor(private loginuserservice:LoginuserService) { }

  ngOnInit(): void {
  }
  // noinspection JSDeprecatedSymbols
  onSignIn(user : String , pass : String) {

    this.user.username = user ;
    this.user.password=pass;
console.log(user,pass)

this.loginuserservice.loginUser(this.user).subscribe(data=>{
  alert("Login Success!")
},error => alert("error login"));
  }
  onSignUp(){

  }

}

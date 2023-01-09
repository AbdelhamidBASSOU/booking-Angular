import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import {LoginuserService} from "../../service/loginuser.service";
import {SignupuserService} from "../../service/signupuser.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

user: User= new User();


  constructor(private loginuserservice:LoginuserService,private signupuserservice:SignupuserService) { }

  ngOnInit(): void {
  }
  // noinspection JSDeprecatedSymbols
  onSignIn(user : String , pass : String) {

    this.user.username = user ;
    this.user.password=pass;

this.loginuserservice.loginUser(this.user).subscribe(data=>{
  alert("Login Success!")
},error => alert("error login"));
  }


  onSignUp(fname : String,lname : String,username : String,email : String,password : String){
this.user.firstName=fname;
this.user.lastName=lname;
this.user.username=username;
this.user.email=email;
this.user.password=password;
this.signupuserservice.signupUser(this.user).subscribe(data=>{
  alert("Registered Successfully ")
},error => alert("Re-fill the fields !"))
  }

}

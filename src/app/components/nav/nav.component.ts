import { Component, OnInit } from '@angular/core';
import {LoginuserService} from "../../service/authentication/loginuser.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLoggedIn = false;
  user_name ="";
  private isLoggedInSubscription!: Subscription;
  private userName!: Subscription;
  constructor(private authService: LoginuserService) { }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      }
    );
    this.userName = this.authService.userLogged.subscribe(
      (user) => {
        if(user.length>0){
          this.user_name = user.toString();
        }
      }
    );
  }
  logout() {
    this.authService.logout();
  }

}

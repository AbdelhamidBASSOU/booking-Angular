import { Component, OnInit } from '@angular/core';
import {Reservation} from "../../model/reservation";
import {User} from "../../model/user";
import {Room} from "../../model/room";
import {ReservationService} from "../../service/reservation/reservation.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LoginuserService} from "../../service/authentication/loginuser.service";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  private jwt:any;
  private token!:String;
  reservations!:Reservation[];
  reservationSub:Reservation;
  user:User;
  room:Room;
  user_id!:number;
  show!:any[]
  errorMessage:String="";
  successMessage:String="";
  constructor(private reservationService:ReservationService,private jwtHelper:JwtHelperService,private authService:LoginuserService,private router:Router) {
    this.user = new User();
    this.room = new Room();
    this.reservationSub=new Reservation();
    if(!this.authService.isLogedIn()){
      this.router.navigate(['/login']);
    }
    if(localStorage!=null){
      // @ts-ignore
      if(localStorage.getItem("access_token").toString()!==null){
        // @ts-ignore
        this.token=localStorage.getItem("access_token").toString();
      }
    }

    if(this.token!=null){
      // @ts-ignore
      this.jwt = this.jwtHelper.decodeToken(this.token);
      this.user_id=this.jwt.user_id;
    }
  }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(){
    this.user.id=this.user_id;
    console.log(this.show);
    this.reservationService.getUserReservation(this.user).subscribe((response)=>{
      if(response instanceof HttpErrorResponse){
        console.log(response.error)
      }else{
        console.log(response)
        this.reservations = response
        if(this.reservations.length) this.show = Array(this.reservations.length).fill(false);
      }
    })
  }


}

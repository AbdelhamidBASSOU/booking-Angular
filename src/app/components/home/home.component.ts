import { Component, OnInit } from '@angular/core';
import {Hotel} from "../../model/hotel";
import {HotelService} from "../../service/hotel/hotel.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
hotels!:Hotel[];
  constructor(private hotelService:HotelService ) { }

  ngOnInit(): void {
    this.getHotels()
  }
getHotels(){
   this.hotelService.getHotels().subscribe((response=>{this.hotels=response}))
}
}

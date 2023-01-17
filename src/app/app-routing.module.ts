import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {NavComponent} from "./components/nav/nav.component";
import {HomeComponent} from "./components/home/home.component";
import {RoomsComponent} from "./components/room/room.component";
import {ReservationComponent} from "./components/reservation/reservation.component";

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'nav',component:NavComponent},
  {path:'login',component:LoginComponent},
  {path:'rooms',component:RoomsComponent},
  {path:'reservation',component:ReservationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

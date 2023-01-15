import {Hotel} from "./hotel";
import {Reservation} from "./reservation";

export class Room {
  id !: number;
  capacity !: number;
  type !:String;
  price !:number;
  hotel!:Hotel;
listReservation!:Reservation;
}

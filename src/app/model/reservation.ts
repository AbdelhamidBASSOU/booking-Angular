import {User} from "./user";
import {Room} from "./room";

export class Reservation {
  id!:number;
  totalPrice!:number;
  startDate!:Date;
  endDate!:Date;
  status!:String;
  client!:User;
  room!:Room;

}

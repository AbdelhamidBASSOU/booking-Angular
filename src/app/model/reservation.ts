import {User} from "./user";
import {Room} from "./room";

export class Reservation {
  id!:number;
  totalPrice!:number;
  startDate!:Date;
  endDate!:Date;

  client!:User;
  room!:Room;

}

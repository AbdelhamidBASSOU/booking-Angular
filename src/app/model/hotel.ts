import {User} from "./user";
import {Room} from "./room";

export class Hotel {
  id!:number;
  name!:String;
  city!:String;
  address!:String;
  isApproved!:boolean;
  manager!:User;
  roomList!:Room[];
}

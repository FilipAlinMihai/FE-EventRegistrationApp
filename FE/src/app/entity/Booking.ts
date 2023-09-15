import { Room } from "./Room";
import { User } from "./User";

export class Booking {
    id: number;
    user: User;
    room:Room;
    seats:number;
  
    constructor(id: number, seats: number, user:User,room:Room) {
      this.id = id;
      this.seats = seats;
      this.user = user;
      this.room = room;
    }

  }
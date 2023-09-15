import { Event2 } from "./Event2";
import { User } from "./User";

export class Invitation {
    id: number;
    sender: User;
    reciver:User;
    event:Event2;
  
    constructor(id: number,sender: User,reciver:User,event:Event2 ) {
      this.id = id;
      this.sender = sender;
      this.reciver = reciver;
      this.event=event;
    }

  }
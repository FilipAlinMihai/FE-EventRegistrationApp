import { Event2 } from "./Event2";

export class Room {
    id: number;
    name: string;
    coordinator:string;
    seats:number;
    event:Event2;
    occupied:number;
  
    constructor(id: number, name: string, coordinator:string,seats:number,event:Event2,occupied:number) {
      this.id = id;
      this.name = name;
      this.coordinator = coordinator;
      this.seats = seats;
      this.event=event;
      this.occupied=occupied;
    }
  
    print(){
      console.log(this.name);
    }
  }
  
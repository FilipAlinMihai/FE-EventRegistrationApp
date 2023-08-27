export class Room {
    id: number;
    name: string;
    coordinator:string;
    seats:number;
    event:number;
  
    constructor(id: number, name: string, coordinator:string,seats:number,event:number) {
      this.id = id;
      this.name = name;
      this.coordinator = coordinator;
      this.seats = seats;
      this.event=event;
    }
  
    print(){
      console.log(this.name);
    }
  }
  
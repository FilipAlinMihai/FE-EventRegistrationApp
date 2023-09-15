export class Event {
    id: number;
    name: string;
    type:string;
    rooms:number;
    dateE:Date;
    privateE:boolean;
  
    constructor(id: number, name: string, type:string,rooms:number,dateE:Date,privateE:boolean) {
      this.id = id;
      this.name = name;
      this.type = type;
      this.rooms = rooms;
      this.dateE=dateE;
      this.privateE=privateE;
    }
  
    print(){
      console.log(this.name);
    }
  }
  